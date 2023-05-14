import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import * as ExcelJS from 'exceljs';
import * as fs from 'fs';
import { StrategicAxeService } from './strategic-axe.service';
import { StrategicObjectiveService } from './strategic-objective.service';
import { OperationalObjectiveService } from './operational-objective.service';
import { StrategicOrientationService } from './strategic-orientation.service';
import { PerformanceIndicatorService } from './performance-indicator.service';
import { StructureService } from './structure.service';
import { ContratService } from './contrat.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UploadExcelFileService {
  private readonly logger = new Logger(UploadExcelFileService.name);

  constructor(
    private readonly strategicAxeService: StrategicAxeService,
    private readonly strategicObjectiveService: StrategicObjectiveService,
    private readonly operationalObjectiveService: OperationalObjectiveService,
    private readonly strategicOrientationService: StrategicOrientationService,
    private readonly performanceIndicatorService: PerformanceIndicatorService,
    private readonly contratService: ContratService,
    private readonly structureService: StructureService,
  ) {}

  async uploadFileExcel(file: Express.Multer.File) {
    try {
      const stream = fs.createReadStream(`${process.cwd()}/${file.path}`);
      let workBook = new ExcelJS.Workbook();
      workBook = await workBook.xlsx.read(stream);
      const workSheet = workBook.getWorksheet(1);

      await workSheet.eachRow({ includeEmpty: true }, async (row, rowNumber) => {
        // Ignorer la première ligne (en-tête)
        if (rowNumber > 1) {
          const rowData = [];
          await row.eachCell({ includeEmpty: true }, (cell) => {
            rowData.push(cell.value);
          });
          const isEmpty = !!rowData.find((rowData) => rowData !== null);

          if (isEmpty) {
            const {
              strategicAxe,
              strategicObjective,
              strategicOrientation,
              operationalObjective,
              structure,
              contrat,
              performanceIndicator,
            } = await this.axeStrategique(rowData);
            const contratCreated = await this.contratService.createContrat(contrat);
            const structureCreated = await this.structureService.createStructureFile(structure);
            const strategicAxeCreated = await this.strategicAxeService.createStrategicAxe(strategicAxe);
            const strategicObjectiveCreated =
              await this.strategicObjectiveService.createStrategicObjectiveWithAxeStrategiqueId({
                ...strategicObjective,
                axeStrategiqueId: strategicAxeCreated.id,
              });
            const strategicOrientationCreated = await this.strategicOrientationService.createStrategicOrientation({
              ...strategicOrientation,
              objectifStrategiqueId: strategicObjectiveCreated.id,
            });
            const operationalObjectiveCreated = await this.operationalObjectiveService.createOperationalObjective({
              ...operationalObjective,
              orientationStrategiqueId: strategicOrientationCreated.id,
            });
            await this.performanceIndicatorService.createPerformanceIndicator({
              ...performanceIndicator,
              contratId: contratCreated.id,
              objectifOperationnelId: operationalObjectiveCreated.id,
              structureId: structureCreated.id,
            });
          }
        }
      });
      return 'success';
    } catch (e) {
      this.logger.error({
        message: 'Something went wrong',
        errors: e,
      });
    }
  }

  async axeStrategique(rowData: string[]) {
    const strategicAxe = {
      id: +rowData[1],
      label: rowData[0],
    };
    const strategicObjective = {
      id: +rowData[2],
      numero: rowData[3],
      label: rowData[4],
      axeStrategiqueId: +rowData[1],
    };
    const strategicOrientation = {
      id: +rowData[5],
      label: rowData[6],
      objectifStrategiqueId: +rowData[2],
    };
    const operationalObjective = {
      id: +rowData[7],
      label: rowData[8],
      orientationStrategiqueId: +rowData[5],
    };
    const structure = {
      id: +rowData[14],
      typeStructure: rowData[15],
      structureName: rowData[16],
    };
    const contrat = {
      id: +rowData[12],
      label: rowData[13],
    };
    const performanceIndicator = {
      id: +rowData[9],
      indicateursDePerformance: rowData[10],
      year: rowData[11],
      contratId: +rowData[12],
      projectName: rowData[17],
      objectifOperationnelId: +rowData[7],
      result: rowData[18],
      observation: rowData[19],
      structureId: +rowData[14],
    };

    return {
      strategicAxe,
      strategicObjective,
      strategicOrientation,
      operationalObjective,
      structure,
      contrat,
      performanceIndicator,
    };
  }

  async generateExcel() {
    const workBook = new ExcelJS.Workbook();
    const workSheet = workBook.addWorksheet('Plan Strategique');

    workSheet.columns = [
      { header: 'AxeStrategique', key: 'AxeStrategique', width: 20 },
      { header: 'Id_AxeStrategique', key: 'Id_AxeStrategique', width: 5 },
      { header: 'Id_ObjectifStrategique', key: 'Id_ObjectifStrategique', width: 5 },
      {
        header: 'NumeroObjectifStrategique',
        key: 'NumeroObjectifStrategique',
        width: 10,
      },
      { header: 'ObjectifStrategique', key: 'ObjectifStrategique', width: 20 },
      {
        header: 'Id_OrientationStrategique',
        key: 'Id_OrientationStrategique',
        font: { size: 5 },
        width: 5,
      },
      { header: 'OrientationStrategique', key: 'OrientationStrategique', width: 20 },
      {
        header: 'Id_ObjectifOperationnel',
        key: 'Id_ObjectifOperationnel',
        width: 5,
      },
      { header: 'ObjectifOperationnel', key: 'ObjectifOperationnel', width: 20 },
      {
        header: 'Id_IndicateursDePerformance',
        key: 'Id_IndicateursDePerformance',
        width: 5,
      },
      { header: 'IndicateursDePerformance', key: 'IndicateursDePerformance', width: 20 },
      { header: 'Annee', key: 'Annee', width: 20, style: { numFmt: 'dd/mm/yyyy' } },
      { header: 'Id_Contrat', key: 'Id_Contrat', width: 5 },
      { header: 'Contrat', key: 'Contrat', width: 5 },
      { header: 'Id_Structure', key: 'Id_Structure', width: 5 },
      { header: 'TypeStructure', key: 'TypeStructure', width: 10 },
      { header: 'StructureName', key: 'StructureName', width: 10 },
      { header: 'NomProjetSpecial', key: 'NomProjetSpecial', width: 15 },
      { header: 'Resultat', key: 'Resultat', width: 20 },
      { header: 'Observation', key: 'Observation', width: 20 },
    ];

    const headers = workSheet.getRow(1);
    headers.eachCell((cell) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FCBB3C' },
      };
    });

    const results = await this.strategicAxeService.getViewAxe();
    if (results.length <= 0) {
      throw new HttpException('Aucune donnée', HttpStatus.NOT_FOUND);
    }

    results.forEach((row) => {
      workSheet.addRow(row);
    });
    workSheet.autoFilter = {
      from: {
        row: 1,
        column: 1,
      },
      to: {
        row: 1,
        column: workSheet.columns.length,
      },
    };
    workSheet.columns.forEach((column) => {
      let maxLength = column.header.length;
      column.eachCell({ includeEmpty: true }, (cell) => {
        const columnLength = cell.value ? cell.value.toString().length : 0;
        maxLength = Math.max(maxLength, columnLength);
      });
      column.width = maxLength;
    });
    const link = `${process.cwd()}/files/Plan_Strategique-${uuidv4()}.xlsx`;
    await workBook.xlsx.writeFile(`${link}`);
    return link;
  }
}
