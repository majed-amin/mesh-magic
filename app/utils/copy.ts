export const copyTextClient = async (text: string): Promise<void> => {
  if (!navigator.clipboard) {
    throw new Error("Clipboard API not available");
  }

  await navigator.clipboard.writeText(text);
};
