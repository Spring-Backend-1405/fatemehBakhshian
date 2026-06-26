import bcrypt from 'bcrypt';

export const hashPassword = async (password) => {
  const hashedPassword = await bcrypt.hashSync(password, 10);
  return hashedPassword;
};
export const comparePassword = async (enteredPassword, savedPassword) => {
  const isPasswordCorrect = await bcrypt.compareSync(enteredPassword, savedPassword);
  return isPasswordCorrect;
};
