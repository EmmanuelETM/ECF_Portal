// Format XML
export function formatXml(xml) {
  let formatted = "";
  const reg = /(>)(<)(\/*)/g;
  xml = xml.replace(reg, "$1\r\n$2$3");
  let pad = 0;
  xml.split("\r\n").forEach((node) => {
    let indent = 0;
    if (node.match(/.+<\/\w[^>]*>$/)) {
      indent = 0;
    } else if (node.match(/^<\/\w/)) {
      if (pad !== 0) pad -= 1;
    } else if (node.match(/^<\w[^>]*[^/]>.*$/)) {
      indent = 1;
    } else {
      indent = 0;
    }

    const padding = "  ".repeat(pad);
    formatted += padding + node + "\r\n";
    pad += indent;
  });

  return formatted;
}

//
export function highlightXML(xml) {
  const escaped = xml
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  return escaped
    .replace(
      /(\w+)="(.*?)"/g,
      '<span class="text-green-700">$1</span>="<span class="text-blue-700">$2</span>"'
    )
    .replace(/(&lt;\/?)(\w+)/g, '$1<span class="text-red-800">$2</span>');
}
