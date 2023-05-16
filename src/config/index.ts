import { Sequelize } from "sequelize-typescript";
//import { Axes_Strategiques, Objectifs_Strategiques, Orientations_Strategiques, Objectifs_Operationnels, Structures } from "./psd.model";
import * as ExcelJS from 'exceljs';

const sequelize = new Sequelize({
    database:'BDTemporaire',
    dialect:'mssql',
    username:'Khal',
    password:'QKDJpassword1',
    host:'localhost',
    port:1433,
});

sequelize.sync();

async function generateExcel(){


    const classeur = new ExcelJS.Workbook();
    const psd = classeur.addWorksheet('Plan Strategique');
    
    psd.columns = [
        { header: 'AxeStrategique', key: 'AxeStrategique' },
        { header: 'Id_AxeStrategique', key: 'Id_AxeStrategique', hidden:true },
        { header: 'Id_ObjectifStrategique', key: 'Id_ObjectifStrategique', hidden:true },
        {
          header: 'NumeroObjectifStrategique',
          key: 'NumeroObjectifStrategique',
        },
        { header: 'ObjectifStrategique', key: 'ObjectifStrategique' },
        {
          header: 'Id_OrientationStrategique',
          key: 'Id_OrientationStrategique', hidden:true
        },
        { header: 'OrientationStrategique', key: 'OrientationStrategique' },
        {
          header: 'Id_ObjectifOperationnel',
          key: 'Id_ObjectifOperationnel', hidden:true
        },
        { header: 'ObjectifOperationnel', key: 'ObjectifOperationnel' },
        {
          header: 'Id_IndicateursDePerformance', key: 'Id_IndicateursDePerformance', hidden:true
        },
        { header: 'IndicateursDePerformance', key: 'IndicateursDePerformance' },
        { header: 'Annee', key: 'Annee' },
        { header: 'Id_Contrat', key: 'Id_Contrat', hidden:true },
        { header: 'Contrat', key: 'Contrat' },
        { header: 'Id_Structure', key: 'Id_Structure', hidden:true },
        { header: 'TypeStructure', key: 'TypeStructure' },
        { header: 'StructureName', key: 'StructureName' },
        { header: 'NomProjetSpecial', key: 'NomProjetSpecial' },
        { header: 'Resultat', key: 'Resultat' },
        { header: 'Observation', key: 'Observation', hidden:true },
      ];
    
    const [results, metadata] = await sequelize.query("select * from Plan_Strategique");
    
    console.log(metadata);

    results.forEach((row) => {
        psd.addRow(row);
      });

  

     // psd.getColumn('Id_AxeStrategique').hidden = true;

      classeur.xlsx.writeFile("C:/Users/Khal/NodeJs/TestJs/khal.xlsx");
      
    }


    async function AddPSD(){

      try{

    
      const classeur = new ExcelJS.Workbook();
      await classeur.xlsx.readFile("C:/Users/Khal/NodeJs/TestJs/khal.xlsx");
  
      const psd = classeur.getWorksheet("Plan Strategique");
      const rows = psd.spliceRows(1,1);


      var AxesStrategique :{
        id : any,
        axeStrategique : any}[]  =[];

      var Contrat:{
        id : any,
        contrat : any}[] =[];


      var IndicateurPSD =[];

      var IndicateurDePerformance :{
        id: any,
        objectifOperationel: any ,
        indicateur: any ,
        annee : any,
        contrat : any,
        structurename : any,
        nomprojetspecial :any,
        resultat : any,
        observation :any} []= [];

      var Objectifs_Operationnel:{
        id : any,
        orientationStrategique : any,
        objectifOperationel : any}[]=[];

      var Objectifs_Strategique:{
        id : any,
        axeStrategique : any,
        numero : any,
        objectifStrategique : any}[] =[];

      var Orientations_Strategique:{
        id : any,
        objectifStrategique : any,
        orientationStrategique : any
      }[]=[];

      var Structure:{
        id: any,
        structureType: any,
        structureName: any}[] =[];


      psd.eachRow({ includeEmpty: true }, function(row, rowNumber){
        AxesStrategique.push({
          id : row.getCell(2).value,
          axeStrategique : row.getCell(1).value
        });

        Objectifs_Strategique.push({
          id : row.getCell(3).value,
          axeStrategique : row.getCell(1).value,
          numero : row.getCell(4).value,
          objectifStrategique : row.getCell(5).value
        });

        Orientations_Strategique.push({
          id : row.getCell(6).value,
          objectifStrategique : row.getCell(5).value,
          orientationStrategique : row.getCell(7).value
        });

        Objectifs_Operationnel.push(
          {
            id : row.getCell(8).value,
            orientationStrategique : row.getCell(7).value,
            objectifOperationel : row.getCell(9).value
          });
        Structure.push({
          id: row.getCell(15).value,
          structureType: row.getCell(16).value,
          structureName: row.getCell(17).value
        });

        Contrat.push({
          id : row.getCell(13).value,
          contrat : row.getCell(14).value
        });


        IndicateurDePerformance.push({
          id : row.getCell(10).value,
          objectifOperationel : row.getCell(9).value ,
          indicateur: row.getCell(11).value ,
          annee : row.getCell(12).value,
          contrat : row.getCell(14).value,
          structurename : row.getCell(17).value,
          nomprojetspecial :row.getCell(18).value,
          resultat : row.getCell(19).value,
          observation :row.getCell(20).value
        });
      });

      //Indicateur
      const groupedIndicateurs = IndicateurDePerformance.reduce((acc: any, curr) => {
        const key = curr.id + '-' + curr.indicateur + '-' + curr.annee;
        if (!acc[key]) {
          acc[key] = {
            id: curr.id,
            objectifOperationel: curr.objectifOperationel,
            indicateur: curr.indicateur,
            annee: curr.annee,
            contrats: [curr.contrat],
            structurenames: [curr.structurename],
            nomprojetspeciales: [curr.nomprojetspecial],
            resultats: [curr.resultat],
            observations: [curr.observation]
          };
        } else {

        }
        return acc;
      }, {});
     const Indicateur = Object.values(groupedIndicateurs);

           //AxeStrategiques
           const groupedAxeStrategique = AxesStrategique.reduce((acc: any, curr) => {
            const key = curr.id + '-' + curr.axeStrategique;
            if (!acc[key]) {
              acc[key] = {
                id: curr.id,
                axeStrategique: curr.axeStrategique
              };
            } else {
    
            }
            return acc;
          }, {});

          const axestr = Object.values(groupedAxeStrategique);
          //Contrat
          const groupedContrat = Contrat.reduce((acc: any, curr) => {
            const key = curr.id + '-' + curr.contrat;
            if (!acc[key]) {
              acc[key] = {
                id: curr.id,
                contrat: curr.contrat
              };
            } else {
    
            }
            return acc;
          }, {});
        const contrat = Object.values(groupedContrat);

          const groupedStructure = Structure.reduce((acc: any, curr) => {
            const key = curr.id + '-' + curr.structureName;
            if (!acc[key]) {
              acc[key] = {
                id: curr.id,
                structureType: curr.structureType,
                structureName: curr.structureName
              };
            } else {
    
            }
            return acc;
          }, {});
          const str = Object.values(groupedStructure);
          const groupedObjectifOps = Objectifs_Operationnel.reduce((acc: any, curr) => {
            const key = curr.id + '-' + curr.objectifOperationel;
            if (!acc[key]) {
              acc[key] = {
                id: curr.id,
                orientationStrategique: curr.orientationStrategique,
                objectifOperationel: curr.objectifOperationel
              };
            } else {
    
            }
            return acc;
          }, {});
          const ObjOps = Object.values(groupedObjectifOps);
          const groupedOrientations = Orientations_Strategique.reduce((acc: any, curr) => {
            const key = curr.id + '-' + curr.orientationStrategique;
            if (!acc[key]) {
              acc[key] = {
                id: curr.id,
                objectifStrategique: curr.objectifStrategique,
                orientationStrategique: curr.orientationStrategique
              };
            } else {
    
            }
            return acc;
          }, {});
          const Orien = Object.values(groupedOrientations);

          const groupedObjectifStr= Objectifs_Strategique.reduce((acc: any, curr) => {
            const key = curr.id + '-' + curr.objectifStrategique;
            if (!acc[key]) {
              acc[key] = {
                id: curr.id,
                axeStrategique: curr.axeStrategique,
                numero: curr.numero,
                objectifStrategique: curr.objectifStrategique
              };
            } else {
    
            }
            return acc;
          }, {});
          const ObjStr = Object.values(groupedObjectifStr);




      //Donnée à mettre à jour
      var AxesUpdt = axestr.filter((axe :any) => axe.id !== null);
      var objectifstr = ObjStr.filter((obj :any) => obj.id !==null);
      var orientationStrUpdt = Orien.filter((obj :any) => obj.id !==null);
      var objectifOpsUpdt = ObjOps.filter((obj :any) => obj.id !==null);
      var structureUpdt = str.filter((obj :any) => obj.id !==null);
      var contratUpdt = contrat.filter((obj :any) => obj.id !==null);
      var indicateurUpdt = Indicateur.filter((obj :any) => obj.id !==null);

      
      //Données à ajouter
      var AxesNew = axestr.filter((axe :any) => axe.id === null);
      var objectifstrNew = ObjStr.filter((obj :any) => obj.id ===null);
      var orientationStrNew = Orien.filter((obj :any) => obj.id ===null);
      var objectifOpsNew = ObjOps.filter((obj :any) => obj.id ===null);
      var structureNew = str.filter((obj :any) => obj.id ===null);
      var contratNew = contrat.filter((obj :any) => obj.id ===null);
      var indicateurNew = Indicateur.filter((obj :any) => obj.id ===null); 




      //Grouper les données à mettre à jour

   


       //Grouper les données à ajouter


      
          
    }
    catch (error){
      console.log(error);
    }

      

    }
    
    
    //generateExcel();


    console.log(AddPSD());
    

