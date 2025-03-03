function isValidUrl(string) {
    const pattern = new RegExp(
      '^((https?:\\/\\/)?' + // protocol
      '([\\da-z.-]+)\\.([a-z.]{2,6})' + // domain name and extension
      '([\\/\\w .-]*)*\\/?$)', // port and path
      'i'
    );
    return !!pattern.test(string);
  }
  
export { isValidUrl};
