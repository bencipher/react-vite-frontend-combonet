export const randomBytes = (length: number) => {
  function randomString(length: number, chars: string) {
    let result = "";
    const charLength = chars.length;
    for (let i = length; i > 0; --i) {
      result += chars[Math.floor(Math.random() * charLength)];
    }
    return result;
  }

  const chars =
    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+~`|}{[]:;?><,./-=";
  const encodedString = randomString(length, chars);

  return encodedString;
};
