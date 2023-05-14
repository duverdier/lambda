export const registerEmail = (args: { email: string; SUBJECT: string; BODY: string; HEADER: string }) => {
  const { email, SUBJECT, BODY, HEADER } = args;
  return {
    to: email,
    subject: SUBJECT,
    template: './register-email',
    context: {
      HEADER,
      BODY,
    },
  };
};
