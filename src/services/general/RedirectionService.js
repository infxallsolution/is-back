



const redirectToModule = async (module,name,token) => {
  try {
    let url = `http://${name}.infxsolution.com/${module}?token=${token}`;
    url = `http://qa-is-ov-${name}.infxsolution.com/${module}/Formas/MenuInfos.aspx?token=${token}`    
    //url = `http://app.infos.com/${module}/Formas/MenuInfos.aspx?token=${token}`
	if(module=="tarima")		  
     url = `http://app.infos.com/${module}/Formas/Tarima.aspx?token=${token}`
    return { redirectTo: url, status: 200 };
  } catch (err) {
    return { message: 'Error en el servidor', status: 500, error: err };
  }
}



const redirectToDashboard = async () => {
  try {    
    let url = 'http://is-front.infxsolution.com/'
    return { redirectTo: url, status: 200 };
  } catch (err) {
    return { message: 'Error en el servidor', status: 500, error: err };
  }
}



export default {
  redirectToModule,
  redirectToDashboard
};