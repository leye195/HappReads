export const getAtk = () => {
  const atk =  sessionStorage.getItem("atk");
  return atk;
};

export const getAvartUrl = (img) => {
  return img === undefined
    ? "https://wetuberbucket.s3.ap-northeast-2.amazonaws.com/avatars/58c11a401956bab841de5f227c337c43"
    : img;
};

export const formatAuthors = (authors) => {
  let s = "";
  if (authors) {
    for (let i = 0; i < authors.length; i++) {
      s += `${authors[i]} `;
    }
  }
  return s;
};

export const getAvg = (votes) => {
  if (votes) {
    let total = 0;
    if (votes.length > 0) {
      for (let i = 0; i < votes.length; i++) {
        total += parseInt(votes[i].vote);
      }
      return (total / votes.length).toFixed(2);
    }
    return 0;
  }
  return 0;
};
