
export const parseParams = (params: Object): String => {
  let i = 0, url = '';
  if (params) {
  for (const key in params) {
    if (params.hasOwnProperty(key)) {
      if (i === 0) {
        url += `?${key}=${params[key]}`;
        } else {
        url += `&${key}=${params[key]}`;
        }
        i++;
        }
    }
  }
  return url;
};

export const dateFormat = 'dd-MM-yy HH:mm';
