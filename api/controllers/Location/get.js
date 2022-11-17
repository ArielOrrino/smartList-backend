module.exports = {

  async fn(inputs, exits, env) {
    const {req, res} = env;
    const { query } = req;
    const { reqId } = res.options;
    const { lat, lon } = query;
    const headers = {
      'user-agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.76 Safari/537.36'
    };

    const axiosParams = {
      url: UrlsService.getLocation(),
      reqId,
      headers,
      params: { lat,lon },
    };
    const [err, data] = await ToService.promiseToAsync(AxiosService.get(axiosParams));
    if (err) {
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
