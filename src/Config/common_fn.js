import {
  Platform,
  ToastAndroid,
  LayoutAnimation,
  UIManager,
  PermissionsAndroid,
  Linking,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
// import RNFS from 'react-native-fs';
// import XLSX from 'xlsx';
// import RNFetchBlob from 'rn-fetch-blob';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import {Media} from '../Global/Media';

const common_fn = {
  showToast: msg => {
    if (Platform.OS === 'android') {
      ToastAndroid.show(msg, ToastAndroid.SHORT);
    }
  },
  Accordion: () => {
    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true);
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    }
  },
  AccordionAnimation: () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  },
  formatNumberWithCommas: number => {
    // return number.toString().replace(/\B(?=(\d{2})+(?!\d))/g, ',');
    const parts = number.toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{2})+(?!\d))/g, ',');
    return parts.join('.');
  },
  uploadMedia: image => {
    return new Promise(async (resolve, reject) => {
      var myHeaders = new Headers();
      myHeaders.append('Authorization', authorization);
      myHeaders.append('Content-Type', 'multipart/form-data;');
      var {uri} = image;

      let formdata = new FormData();
      formdata.append('file', {uri, type: 'image/jpeg'});
      let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow',
      };
      fetch(
        'https://backend.albionpropertyhub.com/api/Properties/add_image',
        requestOptions,
      )
        .then(response => response.text())
        .then(result => resolve(result))
        .catch(error => reject(error));
    });
  },
  locationPermission: () =>
    new Promise(async (resolve, reject) => {
      if (Platform.OS === 'ios') {
        try {
          const permissionStatus = await Geolocation.requestAuthorization(
            'whenInUse',
          );
          if (permissionStatus === 'granted') {
            return resolve('granted');
          }
          reject('Permission not granted');
        } catch (error) {
          return reject(error);
        }
      }
      return PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      )
        .then(granted => {
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            resolve('granted');
          }
          return reject('Location Permission denied');
        })
        .catch(error => {
          return reject(error);
        });
    }),
  // exportDataToExcel: async item => {
  //   try {
  //     const sample = [item];
  //     const ws = XLSX.utils.json_to_sheet(sample);
  //     const wb = XLSX.utils.book_new();
  //     XLSX.utils.book_append_sheet(wb, ws, 'PropertyDetails');
  //     const wbout = XLSX.write(wb, {type: 'base64', bookType: 'xlsx'});

  //     const fileName = `${item?.property_name}.xlsx`;
  //     const internalPath = `${RNFS.DocumentDirectoryPath}/${fileName}`;
  //     const externalPath = `${RNFS.ExternalStorageDirectoryPath}/Download/${fileName}`;

  //     await RNFS.writeFile(internalPath, wbout, 'base64');

  //     await RNFS.moveFile(internalPath, externalPath);

  //     common_fn.showToast('The file is now downloaded to your storage device.');

  //     RNFetchBlob.android.actionViewIntent(
  //       externalPath,
  //       'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  //     );
  //   } catch (error) {
  //     console.log('Error saving or moving file:', error);
  //   }
  // },
  formatText: str => {
    if (typeof str !== 'string' || !str) {
      return str;
    } else if (str?.length == 0 || str == undefined || str == null) {
      return '-';
    }
    let splittedString = str.split('_');
    if (splittedString.length > 1) {
      let result = '';
      for (let i = 0; i < splittedString.length; i++) {
        result +=
          splittedString[i].charAt(0).toUpperCase() +
          splittedString[i].slice(1);
        if (i < splittedString.length - 1) {
          result += ' ';
        }
      }
      return result;
    }
    return str.charAt(0).toUpperCase() + str.slice(1);
  },
  fnCapital: str => {
    return str.charAt(0).toUpperCase() + str.substring(1);
  },
  generateCustomID: customIDCounter => {
    customIDCounter.counter = (customIDCounter.counter || 1) % 10;
    const uniqueID = customIDCounter.counter;
    customIDCounter.counter++;
    return uniqueID;
  },
  openAddressOnMap: (label, lat, lng) => {
    const scheme = Platform.select({
      ios: 'maps:0,0?q=',
      android: 'geo:0,0?q=',
    });
    const latLng = `${lat},${lng}`;
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`,
    });
    return Linking.openURL(url);
  },
  // formatNumberWithSuffix: number => {
  //   const absNumber = Math.abs(number);
  //   const suffixes = ['', 'k', 'L', 'C', 't'];
  //   const suffixNum = Math.floor(('' + absNumber).length / 3);
  //   let shortNumber = parseFloat(
  //     (suffixNum !== 0
  //       ? absNumber / Math.pow(1000, suffixNum)
  //       : absNumber
  //     ).toPrecision(3),
  //   );
  //   if (shortNumber % 1 !== 0) {
  //     shortNumber = shortNumber.toFixed(1);
  //   }
  //   return (number < 0 ? '-' : '') + shortNumber + suffixes[suffixNum];
  // },
  formatNumberWithSuffix: amount => {
    if (amount >= 10000000) {
      return (amount / 10000000).toFixed(2) + ' Cr';
    } else if (amount >= 100000) {
      return (amount / 100000).toFixed(2) + ' Lac';
    } else if (amount >= 1000) {
      return (amount / 1000).toFixed(2) + ' K';
    } else {
      return parseInt(amount).toFixed(2);
    }
  },
  formatedDataforSuffix: amount => {
    const [start, end] = amount?.split('-');
    const formattedStart = common_fn.formatNumberWithSuffix(start);
    const formattedEnd = common_fn.formatNumberWithSuffix(end);
    return `${formattedStart} - ${formattedEnd}`;
  },
  formatNumberIndianEnglishCommas: number => {
    const formatter = new Intl.NumberFormat('en-IN');
    return formatter.format(number);
  },
  formatBudgetTitle: title => {
    function formatNumberWithCommas(number) {
      const formatter = new Intl.NumberFormat('en-IN');
      return formatter.format(number);
    }
    // const [start, end] = title.split('-');
    // const formattedStart = Number(start).toLocaleString();
    // const formattedEnd = Number(end).toLocaleString();
    // return `${formattedStart}-${formattedEnd}`;
    const [start, end] = title.split('-');
    const formattedStart = formatNumberWithCommas(Number(start));
    const formattedEnd = formatNumberWithCommas(Number(end));
    return `${formattedStart}-${formattedEnd}`;
  },
  // convertObjectToHtml: propertyData => {
  //   // const imagesHtml = propertyData?.images
  //   //   .map(
  //   //     image => `<img src=${image?.image_url} alt='albionImages' style={{width:300px,height:200px}}/>`,
  //   //   )
  //   //   .join('');
  //   // const featuresHtml = propertyData.features
  //   //   .map(feature => `<li>${feature.title}: ${feature.value}</li>`)
  //   //   .join('');
  //   // const amenitiesHtml = propertyData.amenities
  //   //   .map(feature => `<li>${feature.title}: ${feature.value}</li>`)
  //   //   .join('');

  //   // const html = `
  //   //   <html>
  //   //     <head>
  //   //       <style>
  //   //         table {
  //   //           width: 100%;
  //   //           border-collapse: collapse;
  //   //         }
  //   //         th, td {
  //   //           border: 1px solid #dddddd;
  //   //           text-align: left;
  //   //           padding: 8px;
  //   //         }
  //   //         img {
  //   //           max-width: 100%;
  //   //           height: auto;
  //   //         }
  //   //       </style>
  //   //     </head>
  //   //     <body>
  //   //       <h2>${propertyData.property_name}</h2>
  //   //       <h2>${propertyData.property_action}</h2>
  //   //       <table>
  //   //         <tr>
  //   //           <td><strong>Property ID:</strong></td>
  //   //           <td>${propertyData.p_id}</td>
  //   //         </tr>
  //   //         <tr>
  //   //           <td><strong>Property Type:</strong></td>
  //   //           <td>${propertyData.property_type?.pt_name}</td>
  //   //         </tr>
  //   //       </table>
  //   //       <table>
  //   //         <tr>
  //   //           <td><strong>Address:</strong></td>
  //   //           <td>${propertyData?.address}</td>
  //   //         </tr>
  //   //         <tr>
  //   //           <td><strong>location:</strong></td>
  //   //           <td>${propertyData?.location}</td>
  //   //         </tr>
  //   //         <tr>
  //   //           <td><strong>locality:</strong></td>
  //   //           <td>${propertyData?.locality}</td>
  //   //         </tr>
  //   //         <tr>
  //   //           <td><strong>Property Facing:</strong></td>
  //   //           <td>${propertyData?.facing}</td>
  //   //         </tr>
  //   //       </table>
  //   //       <table>
  //   //       <tr>
  //   //         <td><strong> Total Price:</strong></td>
  //   //         <td>${propertyData?.expected_price}</td>
  //   //       </tr>
  //   //         <tr>
  //   //           <td><strong> Total ${propertyData?.area?.super_area_unit
  //   //   }:</strong></td>
  //   //           <td>${propertyData?.area?.super_area} ${propertyData?.area?.super_area_unit
  //   //   }</td>
  //   //         </tr>
  //   //         <tr>
  //   //           <td><strong>per ${propertyData?.area?.super_area_unit
  //   //   }:</strong></td>
  //   //           <td>${common_fn.formatNumberWithSuffix(
  //   //     propertyData?.expected_price / propertyData?.area?.super_area,
  //   //   )}</td>
  //   //         </tr>
  //   //       </table>
  //   //       <h3>Property Description:</h3>
  //   //       <p>${propertyData?.description}</p>
  //   //       <h3>Features:</h3>
  //   //       <ul>${featuresHtml}</ul>
  //   //       <h3>Amenities:</h3>
  //   //       <ul>${amenitiesHtml}</ul>
  //   //       <h3>Property Images:</h3>
  //   //       ${imagesHtml}
  //   //       <table>
  //   //       <th>Seller Details</th>
  //   //         <tr>
  //   //           <td><strong> User Name:</strong></td>
  //   //           <td>${propertyData?.seller_details?.username}</td>
  //   //         </tr>
  //   //         <tr>
  //   //           <td><strong>Mobile Number</strong></td>
  //   //           <td>${propertyData?.seller_details?.mobile_number}</td>
  //   //         </tr>
  //   //         <tr>
  //   //           <td><strong>Email</strong></td>
  //   //           <td>${propertyData?.seller_details?.email}</td>
  //   //         </tr>
  //   //       </table>
  //   //     </body>
  //   //   </html>
  //   // `;
  //   const html = `
  //     <html>
  //       <head>
  //         <style>
  //           table {
  //             width: 100%;
  //             border-collapse: collapse;
  //           }
  //           th, td {
  //             border: 1px solid #dddddd;
  //             text-align: left;
  //             padding: 8px;
  //           }
  //           img {
  //             max-width: 100%;
  //             height: auto;
  //           }
  //         </style>
  //       </head>
  //       <body>
  //       <div id={styles.main}>
  //       <div id={styles.Header}>
  //           <img src=${Media.logo} id={styles.Logo} height={80} width={150} />
  //       </div>
  //       <div id={styles.ImageText} className='border'>
  //           <img src=${require("../assets/image/albionIcon.png")} />
  //           <h1>Looking for a new property</h1>
  //       </div>
  //       <div className='container'>
  //           ${propertyData?.map((data) => {
  //     return (
  //       <div id={styles.middle}>
  //         <table className='table table-striped table-bordered'>
  //           <tbody style={{ textAlign: "center" }}>
  //             <tr>
  //               <td>Property ID:</td>
  //               <td>{data.p_id}</td>
  //             </tr>
  //             <tr>
  //               <td>Property Type:</td>
  //               <td>{data.real_estate}</td>
  //             </tr>
  //             <tr>
  //               <td>Address:</td>
  //               <td>{data.address}</td>
  //             </tr>
  //             <tr>
  //               <td>location:</td>
  //               <td>{data.location}</td>
  //             </tr>
  //             <tr>
  //               <td>locality:</td>
  //               <td>{data.locality}</td>
  //             </tr>
  //             <tr>
  //               <td>Property Facing:</td>
  //               <td>{data.facing}</td>
  //             </tr>
  //             <tr>
  //               <td>Total Price:</td>
  //               <td>{data.expected_price}</td>
  //             </tr>
  //             <tr>
  //               <td>Total sqft:</td>
  //               <td>{data.area.super_area_unit}</td>
  //             </tr>
  //             <tr>
  //               <td>Per sqft:</td>
  //               <td>{data.area.carpet_area}</td>
  //             </tr>
  //           </tbody>
  //         </table>

  //         <div id={styles.list}>
  //           <h2 style={{ fontSize: "22px" }}>Features:</h2>
  //           <table className='table table-bordered table-striped'>
  //             <tbody style={{ textAlign: "center" }}>
  //               {data.features.map((item, idx) => {
  //                 const [key, value] = item.split(':');
  //                 return (
  //                   <tr key={idx}>
  //                     <td id={styles.lists} className='border'>{key.replace(/_/g, " ")}</td>
  //                     <td id={styles.lists} className='border'>{value}</td>
  //                   </tr>
  //                 );
  //               })}
  //             </tbody>
  //           </table>
  //         </div>

  //       </div>
  //     )
  //   })}
  //       </div>

  //       <div id={styles.Images} className='container mt-5'>
  //           ${propertyData?.map((item, itemIndex) => (
  //     <div key={itemIndex} className='row g-3'>
  //       {item?.images?.map((images, index) => {
  //         return (
  //           <div key={index} className='col-12 col-sm-6 col-md-3'>
  //             <img
  //               src={images.image_url}
  //               alt='albionImages'
  //               className='img-fluid d-block mx-auto rounded'
  //               height={250}
  //               width={300}
  //             />
  //           </div>
  //         )
  //       })}
  //     </div>
  //   ))}
  //       </div>

  //       <div className='container mt-4'>
  //           <h1 style={{ fontSize: "20px" }}>Seller Details</h1>
  //           <table className='table table-bordered table-striped'>
  //               <tbody className='text-center'>
  //                   ${propertyData?.map((data, item) => {
  //     return (
  //       <tr key={item}>
  //         <td style={{ width: '33%', border: "1px solid black" }}>{data.seller_details.username}</td>
  //         <td style={{ width: '33%', border: "1px solid black" }}>{data.seller_details.mobile_number}</td>
  //         <td style={{ width: '33%', border: "1px solid black" }}>{data.seller_details.email}</td>
  //       </tr>
  //     )
  //   })}
  //               </tbody>
  //           </table>
  //       </div>

  //   </div>
  //       </body>
  //     </html>
  //   `;
  //   return html;
  // },
  convertObjectToHtml: propertyData => {
    if (!propertyData || propertyData.length === 0) {
      console.error('Property data is undefined or empty.');
      return '';
    }

    const htmlArray = propertyData.map(data => {
      const imagesHtml = data.images
        .map(
          image =>
            `<img src="${image?.image_url}" alt="albionImages" style="width:300px;height:200px"/>`,
        )
        .join('');
      const featuresHtml = data.features
        .map(feature => `<li>${feature.title}: ${feature.value}</li>`)
        .join('');

      const amenitiesHtml = data.amenities
        .map(amenity => `<li>${amenity.title}: ${amenity.value}</li>`)
        .join('');

      return `
            <div>
                <h2>${data.property_name}</h2>
                <h2>${data.property_action}</h2>
                <table>
                    <tr>
                        <td><strong>Property ID:</strong></td>
                        <td>${data.p_id}</td>
                    </tr>
                    <tr>
                        <td><strong>Property Type:</strong></td>
                        <td>${data.property_type?.pt_name}</td>
                    </tr>
                </table>
                <table>
                    <tr>
                        <td><strong>Address:</strong></td>
                        <td>${data?.address}</td>
                    </tr>
                    <tr>
                        <td><strong>Location:</strong></td>
                        <td>${data?.location}</td>
                    </tr>
                    <tr>
                        <td><strong>Locality:</strong></td>
                        <td>${data?.locality}</td>
                    </tr>
                    <tr>
                        <td><strong>Property Facing:</strong></td>
                        <td>${data?.facing}</td>
                    </tr>
                </table>
                <table>
                    <tr>
                        <td><strong>Total Price:</strong></td>
                        <td>${data?.expected_price}</td>
                    </tr>
                    <tr>
                        <td><strong>Total ${
                          data?.area?.super_area_unit
                        }:</strong></td>
                        <td>${data?.area?.super_area} ${
        data?.area?.super_area_unit
      }</td>
                    </tr>
                    <tr>
                        <td><strong>Per ${
                          data?.area?.super_area_unit
                        }:</strong></td>
                        <td>${common_fn.formatNumberWithSuffix(
                          data?.expected_price / data?.area?.super_area,
                        )}</td>
                    </tr>
                </table>
                <h3>Property Description:</h3>
                <p>${data?.description}</p>
                <h3>Features:</h3>
                <ul>${featuresHtml}</ul>
                <h3>Amenities:</h3>
                <ul>${amenitiesHtml}</ul>
                <h3>Property Images:</h3>
                ${imagesHtml}
                <table>
                    <th>Seller Details</th>
                    <tr>
                        <td><strong>User Name:</strong></td>
                        <td>${data?.seller_details?.username}</td>
                    </tr>
                    <tr>
                        <td><strong>Mobile Number:</strong></td>
                        <td>${data?.seller_details?.mobile_number}</td>
                    </tr>
                    <tr>
                        <td><strong>Email:</strong></td>
                        <td>${data?.seller_details?.email}</td>
                    </tr>
                </table>
            </div>
        `;
    });
    return htmlArray.join('');
  },
  base64Encode: input => {
    const keyStr =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
    let output = '';
    let chr1, chr2, chr3, enc1, enc2, enc3, enc4;
    let i = 0;

    while (i < input.length) {
      chr1 = input.charCodeAt(i++);
      chr2 = input.charCodeAt(i++);
      chr3 = input.charCodeAt(i++);

      enc1 = chr1 >> 2;
      enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
      enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
      enc4 = chr3 & 63;

      if (isNaN(chr2)) {
        enc3 = enc4 = 64;
      } else if (isNaN(chr3)) {
        enc4 = 64;
      }

      output +=
        keyStr.charAt(enc1) +
        keyStr.charAt(enc2) +
        keyStr.charAt(enc3) +
        keyStr.charAt(enc4);
    }

    return output;
  },
  // convertToPdf: async (html, downloadPath, property_name) => {
  //   const options = {
  //     html,
  //     fileName: `${property_name}`,
  //     directory: 'Documents',
  //   };

  //   const file = await RNHTMLtoPDF.convert(options);

  //   downloadPath = downloadPath || RNFetchBlob.fs.dirs.DownloadDir;
  //   const pdfPath = downloadPath + `/${property_name}.pdf`;

  //   try {
  //     const response = await fetch('file://' + file.filePath);
  //     const pdfArrayBuffer = await response.arrayBuffer();
  //     const pdfBase64 = common_fn.base64Encode(
  //       String.fromCharCode.apply(null, new Uint8Array(pdfArrayBuffer)),
  //     );

  //     await RNFetchBlob.fs.writeFile(pdfPath, pdfBase64, 'base64');

  //     common_fn.showToast('The file is now downloaded to your storage device.');
  //     return pdfPath;
  //   } catch (error) {
  //     console.error('Error saving file:', error);
  //     throw error;
  //   }
  // },
  convertToPdf: async (html, downloadPath, property_name) => {
    try {
      const options = {
        html,
        fileName: `${property_name}`,
        directory: 'Documents',
      };

      const file = await RNHTMLtoPDF.convert(options);
      console.log('file', file);

      // downloadPath = downloadPath || RNFetchBlob.fs.dirs.DownloadDir;
      // console.log('Download Path:', downloadPath);

      // const pdfPath = `${downloadPath}/${property_name}.pdf`;
      // console.log('PDF Path:', pdfPath);

      // await RNFetchBlob.fs.cp(file.filePath, pdfPath);
      // console.log('PDF copied successfully.');

      if (Platform.OS === 'android') {
        common_fn.showToast(
          'The file is now downloaded to your storage device.',
        );
      } else {
        alert('The file is now downloaded to your storage device.');
      }

      return pdfPath;
    } catch (error) {
      console.error('Error converting to PDF:', error);
      throw error;
    }
  },

  urlToBase64: async url => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();

      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result.split(',')[1]);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    } catch (error) {
      console.error('Error converting URL to Base64:', error);
      return null;
    }
  },
  getValueByTitle: (data, value) => {
    const foundObject = data.find(item => item.title.includes(value));
    return foundObject ? foundObject.value : null;
  },
  getMinToMaxPrice: data => {
    if (data?.length >= 1) {
      if (data.length === 1) {
        const singlePrice = data[0]?.price_per_bed;
        return common_fn.formatNumberWithSuffix(singlePrice.toString());
      } else {
        var lowest_price = Infinity;
        var highest_price = 0;
        data.forEach(item => {
          if (item?.price_per_bed < lowest_price) {
            lowest_price = item?.price_per_bed;
          }
          if (item?.price_per_bed > highest_price) {
            highest_price = item?.price_per_bed;
          }
        });
        return `${common_fn.formatNumberWithSuffix(
          lowest_price,
        )} - ${common_fn.formatNumberWithSuffix(highest_price)}`;
      }
    } else {
      return '';
    }
  },
};
export default common_fn;
