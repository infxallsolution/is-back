



const redirectToModule = async (module) => {
  console.log(module) 
  try {
    let url = 'http://app.infos.com/' + module
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