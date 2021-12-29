export const parseParams = (params: any): string => {
  let i = 0, url = '';
  if (params) {
  for (const key in params) {
    if (Object.prototype.hasOwnProperty.call(params, key)) {
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
