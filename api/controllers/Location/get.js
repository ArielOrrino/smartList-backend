
module.exports = {

  async fn(inputs, exits, env) {
    const { req, res } = env;
    const { query } = req;
    const { reqId } = res.options;
    const { lat, lon } = query;
    const headers = {
      ...HelperService.getUserAgent()
    };

    const axiosParams = {
      url: UrlsService.getLocation(),
      reqId,
      headers,
      params: { lat,lon },
    };
    console.log('axiosParams: ', axiosParams);
    const [err, data] = await ToService.promiseToAsync(AxiosService.get(axiosParams));
    if (err) {
      console.debug('err: ', err);
      return res.ok(err);
    }

    const {municipio, provincia} = data.data.ubicacion;
    const {nombre: MuniNombre} =municipio;
    const {nombre: provNombre} =provincia;
    const response = {municipio: MuniNombre,
      provincia: provNombre
    };
    console.log('localizacion obtenida: ', response);
    return res.ok(response);
  },
};
