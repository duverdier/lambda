export const resetPasswords = (args: { email: string; SUBJECT: string; BODY: string; HEADER: string }) => {
  const { email, SUBJECT, BODY, HEADER } = args;
  return {
    to: email,
    subject: SUBJECT,
    template: './reset-password',
    context: {
      BODY,
      HEADER,
    },
  };
};
