import AppRating from "../../../components/AppStore/AppRating/interfaces/appRating";

const mockRatings: AppRating[] = [
  {
    id: 1,
    userId: 1,
    rate: 2,
    comment:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla at rutrum justo. Praesent gravida quam eu nulla maximus varius." +
      "Cras eget volutpat mauris. Fusce convallis erat non rhoncus vehicula. Duis et laoreet elit. Proin in semper purus. Praesent porta commodo purus.",
  },
  {
    id: 2,
    userId: 2,
    rate: 6.9,
    comment:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla at rutrum justo. Praesent gravida quam eu nulla maximus varius." +
      "Cras eget volutpat mauris. Fusce convallis erat non rhoncus vehicula. Duis et laoreet elit. Proin in semper purus. Praesent porta commodo purus.",
  },
];

export default mockRatings;