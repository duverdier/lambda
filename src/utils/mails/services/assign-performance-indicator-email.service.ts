export const assignPerformanceIndicatorStructure = (args: {
  email: string;
  SUBJECT: string;
  BODY: string;
  HEADER: string;
  url: string;
}) => {
  const { email, SUBJECT, BODY, HEADER, url } = args;
  return {
    to: email,
    subject: SUBJECT,
    template: './assign-performance-indicator',
    context: {
      HEADER,
      BODY,
      url,
    },
  };
};
