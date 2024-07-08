<script>
export const words = [
  { word: "apple", definition: "A sweet fruit that grows on trees." },
  { word: "banana", definition: "A long curved fruit that grows in clusters and has soft pulpy flesh and yellow skin when ripe." },
  { word: "cherry", definition: "A small, round stone fruit that is typically bright or dark red." },
];

export const getRandomWord = () => {
  const randomIndex = Math.floor(Math.random() * words.length);
  return words[randomIndex];
}
</script>