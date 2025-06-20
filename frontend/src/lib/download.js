export const downloadXml = ({ title, doc }) => {
  const blob = new Blob([doc], { type: "text/xml" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = title;
  a.click();

  URL.revokeObjectURL(url);
};
