export default function downloadFile(link: string, filename?: string) {
  fetch(link, {
    method: "GET",
    headers: {
      responseType: "blob",
    },
  }).then(async (response) => {
    const url = window.URL.createObjectURL(await response.blob());
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", filename || "image.jpg");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });
}
