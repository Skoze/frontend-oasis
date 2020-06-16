export async function read(file) {
  let reader = new FileReader();
  reader.readAsText(file);
  const data = await new Promise((resolve) => {
    reader.onload = function() {
      resolve(reader.result);
    };
  });
  const lines = data.split('\n');
  const headers = readHeader(lines.shift());
  const result = [];
  for (let line of lines) {
    const item = {};
    const values = readLine(line);
    for (let i = 0; i < headers.length; i++) {
      item[headers[i]] = values[i];
    }
    result.push(item);
  }
  return result;
}

// export async function split(file, size) {
//   const data = await read(file);
//   const result = [];
//   for (let i = 0; i < data.length; i += size) {
//     result.push(
//       new Blob(['\uFEFF' + convert2Csv(data.slice(i, i + size))], {
//         type: 'text/csv;charset=utf-8;',
//       })
//     );
//   }
//   return result;
// }

// function convert2Csv(items) {
//   const keys = Object.keys(items[0]);
//   let result = keys.map((value) => `"${value}"`).join(',');
//   for (let item of items) {
//     let arr = [];
//     for (let key of keys) {
//       arr.push(`"${item[key]}"`);
//     }
//     result += '\n';
//     result += arr.join(',');
//   }
//   return result;
// }

export function convert2CsvBlob(items) {
  const keys = Object.keys(items[0]);
  let result = keys.map((value) => `"${value}"`).join(',');
  for (let item of items) {
    let arr = [];
    for (let key of keys) {
      arr.push(`"${item[key]}"`);
    }
    result += '\n';
    result += arr.join(',');
  }
  return new Blob(['\uFEFF' + result], {
    type: 'text/csv;charset=utf-8;',
  });
}

function readHeader(header) {
  return header.split(',').map((value) => value.replace(/^"|"$/g, ''));
}

function readLine(line) {
  const split = line.match(/".*?"(,|$)/g);
  if (Array.isArray(split)) {
    return split.map((value) => value.replace(/^"|"(,|$)/g, ''));
  } else {
    return [];
  }
}
