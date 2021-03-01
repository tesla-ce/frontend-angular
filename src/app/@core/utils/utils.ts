
export const parseParams = (params: Object): String => {
    let i = 0,
      url = "";
  
    if (params) {
      for (let key in params) {
        if (i === 0) {
          url += `?${key}=${params[key]}`;
        } else {
          url += `&${key}=${params[key]}`;
        }
        i++;
      }
    }
    return url;
  };