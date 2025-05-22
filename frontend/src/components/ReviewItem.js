import Estrelas from './Estrelas';

const ReviewItem = ({ review }) => {
  return (
    <div className="review">
      <div className="review-header">
        <strong>{review.usuario}</strong>
        <div className="estrelas">
          <Estrelas nota={review.nota} />
        </div>
      </div>
      <p>{review.comentario}</p>
    </div>
  );
};

export default ReviewItem;
