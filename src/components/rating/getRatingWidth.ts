const getRatingWidth = (rating: number) => {
  switch (true) {
    case (rating >= 1 && rating < 2):
      return 20;
    case (rating >= 2 && rating < 3):
      return 40;
    case (rating >= 3 && rating < 4):
      return 60;
    case (rating >= 4 && rating < 5):
      return 80;
    case (rating === 5):
      return 100;
    default:
      return 0;
  }
};

export default getRatingWidth;
