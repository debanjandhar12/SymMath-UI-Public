var Module=typeof globalThis.__pyodide_module!=="undefined"?globalThis.__pyodide_module:{};if(!Module.expectedDataFileDownloads){Module.expectedDataFileDownloads=0}Module.expectedDataFileDownloads++;(function(){var loadPackage=function(metadata){var PACKAGE_PATH="";if(typeof window==="object"){PACKAGE_PATH=window["encodeURIComponent"](window.location.pathname.toString().substring(0,window.location.pathname.toString().lastIndexOf("/"))+"/")}else if(typeof process==="undefined"&&typeof location!=="undefined"){PACKAGE_PATH=encodeURIComponent(location.pathname.toString().substring(0,location.pathname.toString().lastIndexOf("/"))+"/")}var PACKAGE_NAME="bleach.data";var REMOTE_PACKAGE_BASE="bleach.data";if(typeof Module["locateFilePackage"]==="function"&&!Module["locateFile"]){Module["locateFile"]=Module["locateFilePackage"];err("warning: you defined Module.locateFilePackage, that has been renamed to Module.locateFile (using your locateFilePackage for now)")}var REMOTE_PACKAGE_NAME=Module["locateFile"]?Module["locateFile"](REMOTE_PACKAGE_BASE,""):REMOTE_PACKAGE_BASE;var REMOTE_PACKAGE_SIZE=metadata["remote_package_size"];var PACKAGE_UUID=metadata["package_uuid"];function fetchRemotePackage(packageName,packageSize,callback,errback){if(typeof process==="object"){require("fs").readFile(packageName,function(err,contents){if(err){errback(err)}else{callback(contents.buffer)}});return}var xhr=new XMLHttpRequest;xhr.open("GET",packageName,true);xhr.responseType="arraybuffer";xhr.onprogress=function(event){var url=packageName;var size=packageSize;if(event.total)size=event.total;if(event.loaded){if(!xhr.addedTotal){xhr.addedTotal=true;if(!Module.dataFileDownloads)Module.dataFileDownloads={};Module.dataFileDownloads[url]={loaded:event.loaded,total:size}}else{Module.dataFileDownloads[url].loaded=event.loaded}var total=0;var loaded=0;var num=0;for(var download in Module.dataFileDownloads){var data=Module.dataFileDownloads[download];total+=data.total;loaded+=data.loaded;num++}total=Math.ceil(total*Module.expectedDataFileDownloads/num);if(Module["setStatus"])Module["setStatus"]("Downloading data... ("+loaded+"/"+total+")")}else if(!Module.dataFileDownloads){if(Module["setStatus"])Module["setStatus"]("Downloading data...")}};xhr.onerror=function(event){throw new Error("NetworkError for: "+packageName)};xhr.onload=function(event){if(xhr.status==200||xhr.status==304||xhr.status==206||xhr.status==0&&xhr.response){var packageData=xhr.response;callback(packageData)}else{throw new Error(xhr.statusText+" : "+xhr.responseURL)}};xhr.send(null)}function handleError(error){console.error("package error:",error)}var fetchedCallback=null;var fetched=Module["getPreloadedPackage"]?Module["getPreloadedPackage"](REMOTE_PACKAGE_NAME,REMOTE_PACKAGE_SIZE):null;if(!fetched)fetchRemotePackage(REMOTE_PACKAGE_NAME,REMOTE_PACKAGE_SIZE,function(data){if(fetchedCallback){fetchedCallback(data);fetchedCallback=null}else{fetched=data}},handleError);function runWithFS(){function assert(check,msg){if(!check)throw msg+(new Error).stack}Module["FS_createPath"]("/","lib",true,true);Module["FS_createPath"]("/lib","python3.9",true,true);Module["FS_createPath"]("/lib/python3.9","site-packages",true,true);Module["FS_createPath"]("/lib/python3.9/site-packages","bleach",true,true);Module["FS_createPath"]("/lib/python3.9/site-packages/bleach","_vendor",true,true);Module["FS_createPath"]("/lib/python3.9/site-packages/bleach/_vendor","html5lib",true,true);Module["FS_createPath"]("/lib/python3.9/site-packages/bleach/_vendor/html5lib","_trie",true,true);Module["FS_createPath"]("/lib/python3.9/site-packages/bleach/_vendor/html5lib","filters",true,true);Module["FS_createPath"]("/lib/python3.9/site-packages/bleach/_vendor/html5lib","treeadapters",true,true);Module["FS_createPath"]("/lib/python3.9/site-packages/bleach/_vendor/html5lib","treebuilders",true,true);Module["FS_createPath"]("/lib/python3.9/site-packages/bleach/_vendor/html5lib","treewalkers",true,true);Module["FS_createPath"]("/lib/python3.9/site-packages/bleach/_vendor","html5lib-1.1.dist-info",true,true);Module["FS_createPath"]("/lib/python3.9/site-packages","bleach-3.3.0-py3.9.egg-info",true,true);function processPackageData(arrayBuffer){assert(arrayBuffer,"Loading data file failed.");assert(arrayBuffer instanceof ArrayBuffer,"bad input to processPackageData");var byteArray=new Uint8Array(arrayBuffer);var curr;var compressedData={data:null,cachedOffset:293781,cachedIndexes:[-1,-1],cachedChunks:[null,null],offsets:[0,1307,2680,3728,4863,5981,7043,8068,9334,10672,11856,13075,14230,15931,17395,18624,19849,21158,22171,23135,24040,25280,26343,27756,28876,30098,31120,32140,33324,34513,35737,36753,37930,39350,40765,42121,43378,44711,45980,47433,48975,50437,51411,52495,53733,54747,56142,57296,58468,59556,60927,61979,62903,63959,64950,66039,66972,68074,68999,70160,71455,72282,73482,74424,75485,76293,76926,77710,78424,79165,79807,80464,81042,81530,82218,82903,83369,84009,84838,85763,86457,87082,87791,88602,89450,89925,90545,91240,91877,92663,93464,93958,94590,95141,95681,96138,96981,98406,99603,100698,101559,102227,103088,103775,104465,105244,105877,106448,107475,108541,109677,110799,111757,112622,113561,114392,115176,116157,117014,117945,118881,119806,120712,121640,122586,123521,124431,125347,126239,127194,128010,128817,129727,130665,131584,132500,133312,134256,135174,136116,137429,138662,139767,140832,141624,142602,143703,144786,145933,147188,147757,148372,149126,149866,150932,151860,152630,153587,154696,155749,156572,157414,158062,158824,159625,160443,161308,162226,162949,164009,164989,165809,166668,167682,168741,169859,170654,171583,172598,173486,174393,175199,176212,176972,178050,179070,179850,180800,181550,182362,183272,184198,185146,186024,186928,187659,188502,189694,190928,192144,193318,194393,195339,196079,197041,198254,199380,200393,201417,202109,203108,204002,204901,205757,206538,207623,208089,208577,209230,209950,210654,211397,212169,213197,214163,215235,216454,217450,218703,219954,221072,222387,223527,224764,225815,226905,228052,229070,230090,231224,232239,233134,234100,234942,236083,237008,237806,238662,239537,240490,241644,242826,243660,244598,245508,246383,247510,248634,249934,251032,251946,252920,253853,254730,255738,257003,257794,258858,259821,260828,262027,263388,264445,265559,267137,268593,270162,271680,273225,274625,276139,277583,278930,280446,281596,282839,284181,285632,287039,288390,289851,291194,292422,293272],sizes:[1307,1373,1048,1135,1118,1062,1025,1266,1338,1184,1219,1155,1701,1464,1229,1225,1309,1013,964,905,1240,1063,1413,1120,1222,1022,1020,1184,1189,1224,1016,1177,1420,1415,1356,1257,1333,1269,1453,1542,1462,974,1084,1238,1014,1395,1154,1172,1088,1371,1052,924,1056,991,1089,933,1102,925,1161,1295,827,1200,942,1061,808,633,784,714,741,642,657,578,488,688,685,466,640,829,925,694,625,709,811,848,475,620,695,637,786,801,494,632,551,540,457,843,1425,1197,1095,861,668,861,687,690,779,633,571,1027,1066,1136,1122,958,865,939,831,784,981,857,931,936,925,906,928,946,935,910,916,892,955,816,807,910,938,919,916,812,944,918,942,1313,1233,1105,1065,792,978,1101,1083,1147,1255,569,615,754,740,1066,928,770,957,1109,1053,823,842,648,762,801,818,865,918,723,1060,980,820,859,1014,1059,1118,795,929,1015,888,907,806,1013,760,1078,1020,780,950,750,812,910,926,948,878,904,731,843,1192,1234,1216,1174,1075,946,740,962,1213,1126,1013,1024,692,999,894,899,856,781,1085,466,488,653,720,704,743,772,1028,966,1072,1219,996,1253,1251,1118,1315,1140,1237,1051,1090,1147,1018,1020,1134,1015,895,966,842,1141,925,798,856,875,953,1154,1182,834,938,910,875,1127,1124,1300,1098,914,974,933,877,1008,1265,791,1064,963,1007,1199,1361,1057,1114,1578,1456,1569,1518,1545,1400,1514,1444,1347,1516,1150,1243,1342,1451,1407,1351,1461,1343,1228,850,509],successes:[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]};compressedData["data"]=byteArray;assert(typeof Module.LZ4==="object","LZ4 not present - was your app build with  -s LZ4=1  ?");Module.LZ4.loadPackage({metadata:metadata,compressedData:compressedData},true);Module["removeRunDependency"]("datafile_bleach.data")}Module["addRunDependency"]("datafile_bleach.data");if(!Module.preloadResults)Module.preloadResults={};Module.preloadResults[PACKAGE_NAME]={fromCache:false};if(fetched){processPackageData(fetched);fetched=null}else{fetchedCallback=processPackageData}}if(Module["calledRun"]){runWithFS()}else{if(!Module["preRun"])Module["preRun"]=[];Module["preRun"].push(runWithFS)}};loadPackage({files:[{filename:"/lib/python3.9/site-packages/bleach/__init__.py",start:0,end:3753,audio:0},{filename:"/lib/python3.9/site-packages/bleach/callbacks.py",start:3753,end:4545,audio:0},{filename:"/lib/python3.9/site-packages/bleach/html5lib_shim.py",start:4545,end:24752,audio:0},{filename:"/lib/python3.9/site-packages/bleach/linkifier.py",start:24752,end:44902,audio:0},{filename:"/lib/python3.9/site-packages/bleach/sanitizer.py",start:44902,end:66902,audio:0},{filename:"/lib/python3.9/site-packages/bleach/utils.py",start:66902,end:68003,audio:0},{filename:"/lib/python3.9/site-packages/bleach/_vendor/__init__.py",start:68003,end:68003,audio:0},{filename:"/lib/python3.9/site-packages/bleach/_vendor/README.rst",start:68003,end:69375,audio:0},{filename:"/lib/python3.9/site-packages/bleach/_vendor/pip_install_vendor.sh",start:69375,end:69465,audio:0},{filename:"/lib/python3.9/site-packages/bleach/_vendor/vendor.txt",start:69465,end:69649,audio:0},{filename:"/lib/python3.9/site-packages/bleach/_vendor/html5lib/__init__.py",start:69649,end:70792,audio:0},{filename:"/lib/python3.9/site-packages/bleach/_vendor/html5lib/_ihatexml.py",start:70792,end:87520,audio:0},{filename:"/lib/python3.9/site-packages/bleach/_vendor/html5lib/_inputstream.py",start:87520,end:119820,audio:0},{filename:"/lib/python3.9/site-packages/bleach/_vendor/html5lib/_tokenizer.py",start:119820,end:196848,audio:0},{filename:"/lib/python3.9/site-packages/bleach/_vendor/html5lib/_utils.py",start:196848,end:201767,audio:0},{filename:"/lib/python3.9/site-packages/bleach/_vendor/html5lib/constants.py",start:201767,end:285231,audio:0},{filename:"/lib/python3.9/site-packages/bleach/_vendor/html5lib/html5parser.py",start:285231,end:402405,audio:0},{filename:"/lib/python3.9/site-packages/bleach/_vendor/html5lib/serializer.py",start:402405,end:418152,audio:0},{filename:"/lib/python3.9/site-packages/bleach/_vendor/html5lib/_trie/__init__.py",start:418152,end:418261,audio:0},{filename:"/lib/python3.9/site-packages/bleach/_vendor/html5lib/_trie/_base.py",start:418261,end:419274,audio:0},{filename:"/lib/python3.9/site-packages/bleach/_vendor/html5lib/_trie/py.py",start:419274,end:421037,audio:0},{filename:"/lib/python3.9/site-packages/bleach/_vendor/html5lib/filters/__init__.py",start:421037,end:421037,audio:0},{filename:"/lib/python3.9/site-packages/bleach/_vendor/html5lib/filters/alphabeticalattributes.py",start:421037,end:421956,audio:0},{filename:"/lib/python3.9/site-packages/bleach/_vendor/html5lib/filters/base.py",start:421956,end:422242,audio:0},{filename:"/lib/python3.9/site-packages/bleach/_vendor/html5lib/filters/inject_meta_charset.py",start:422242,end:425187,audio:0},{filename:"/lib/python3.9/site-packages/bleach/_vendor/html5lib/filters/lint.py",start:425187,end:428818,audio:0},{filename:"/lib/python3.9/site-packages/bleach/_vendor/html5lib/filters/optionaltags.py",start:428818,end:439406,audio:0},{filename:"/lib/python3.9/site-packages/bleach/_vendor/html5lib/filters/sanitizer.py",start:439406,end:466291,audio:0},{filename:"/lib/python3.9/site-packages/bleach/_vendor/html5lib/filters/whitespace.py",start:466291,end:467505,audio:0},{filename:"/lib/python3.9/site-packages/bleach/_vendor/html5lib/treeadapters/__init__.py",start:467505,end:468155,audio:0},{filename:"/lib/python3.9/site-packages/bleach/_vendor/html5lib/treeadapters/genshi.py",start:468155,end:469870,audio:0},{filename:"/lib/python3.9/site-packages/bleach/_vendor/html5lib/treeadapters/sax.py",start:469870,end:471646,audio:0},{filename:"/lib/python3.9/site-packages/bleach/_vendor/html5lib/treebuilders/__init__.py",start:471646,end:475238,audio:0},{filename:"/lib/python3.9/site-packages/bleach/_vendor/html5lib/treebuilders/base.py",start:475238,end:489791,audio:0},{filename:"/lib/python3.9/site-packages/bleach/_vendor/html5lib/treebuilders/dom.py",start:489791,end:498716,audio:0},{filename:"/lib/python3.9/site-packages/bleach/_vendor/html5lib/treebuilders/etree.py",start:498716,end:511540,audio:0},{filename:"/lib/python3.9/site-packages/bleach/_vendor/html5lib/treebuilders/etree_lxml.py",start:511540,end:526294,audio:0},{filename:"/lib/python3.9/site-packages/bleach/_vendor/html5lib/treewalkers/__init__.py",start:526294,end:532013,audio:0},{filename:"/lib/python3.9/site-packages/bleach/_vendor/html5lib/treewalkers/base.py",start:532013,end:539489,audio:0},{filename:"/lib/python3.9/site-packages/bleach/_vendor/html5lib/treewalkers/dom.py",start:539489,end:540902,audio:0},{filename:"/lib/python3.9/site-packages/bleach/_vendor/html5lib/treewalkers/etree.py",start:540902,end:545441,audio:0},{filename:"/lib/python3.9/site-packages/bleach/_vendor/html5lib/treewalkers/etree_lxml.py",start:545441,end:551786,audio:0},{filename:"/lib/python3.9/site-packages/bleach/_vendor/html5lib/treewalkers/genshi.py",start:551786,end:554095,audio:0},{filename:"/lib/python3.9/site-packages/bleach/_vendor/html5lib-1.1.dist-info/AUTHORS.rst",start:554095,end:555078,audio:0},{filename:"/lib/python3.9/site-packages/bleach/_vendor/html5lib-1.1.dist-info/INSTALLER",start:555078,end:555082,audio:0},{filename:"/lib/python3.9/site-packages/bleach/_vendor/html5lib-1.1.dist-info/METADATA",start:555082,end:571158,audio:0},{filename:"/lib/python3.9/site-packages/bleach/_vendor/html5lib-1.1.dist-info/RECORD",start:571158,end:574644,audio:0},{filename:"/lib/python3.9/site-packages/bleach/_vendor/html5lib-1.1.dist-info/WHEEL",start:574644,end:574754,audio:0},{filename:"/lib/python3.9/site-packages/bleach/_vendor/html5lib-1.1.dist-info/top_level.txt",start:574754,end:574763,audio:0},{filename:"/lib/python3.9/site-packages/bleach-3.3.0-py3.9.egg-info/PKG-INFO",start:574763,end:598106,audio:0},{filename:"/lib/python3.9/site-packages/bleach-3.3.0-py3.9.egg-info/SOURCES.txt",start:598106,end:601210,audio:0},{filename:"/lib/python3.9/site-packages/bleach-3.3.0-py3.9.egg-info/dependency_links.txt",start:601210,end:601211,audio:0},{filename:"/lib/python3.9/site-packages/bleach-3.3.0-py3.9.egg-info/not-zip-safe",start:601211,end:601212,audio:0},{filename:"/lib/python3.9/site-packages/bleach-3.3.0-py3.9.egg-info/requires.txt",start:601212,end:601246,audio:0},{filename:"/lib/python3.9/site-packages/bleach-3.3.0-py3.9.egg-info/top_level.txt",start:601246,end:601253,audio:0}],remote_package_size:297877,package_uuid:"64c09598-0531-497c-874c-0d7dc593e9f7"})})();