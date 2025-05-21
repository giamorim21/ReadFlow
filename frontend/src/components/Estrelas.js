import { FaStar, FaRegStar } from 'react-icons/fa';

const Estrelas = ({ nota = 0, clicavel = false, onClick = () => {} }) => {
  return (
    <>
      {[1, 2, 3, 4, 5].map((num) => {
        const isCheia = num <= nota;
        const Icon = isCheia ? FaStar : FaRegStar;

        return (
          <Icon
            key={num}
            className={`estrela ${isCheia ? 'cheia' : 'vazia'}${clicavel ? ' clicavel' : ''}`}
            onClick={() => clicavel && onClick(num)}
            role={clicavel ? 'button' : undefined}
            tabIndex={clicavel ? 0 : undefined}
            aria-label={`${num} estrela${num > 1 ? 's' : ''}`}
            onKeyDown={(e) => {
              if (clicavel && (e.key === 'Enter' || e.key === ' ')) onClick(num);
            }}
          />
        );
      })}
    </>
  );
};

export default Estrelas;
