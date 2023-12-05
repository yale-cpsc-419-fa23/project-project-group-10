import React from 'react';
import { Link } from 'react-router-dom';

// const DataDisplay = ({ dataFromFlask }) => {
//   return (
//     <div>
//       {dataFromFlask.map((item, index) => (
//         <div key={index}>
//           {/* Access each dictionary item's properties here */}
//           <p>Name: {item.name}</p>
//           <p>Age: {item.age}</p>
//           {/* Render other properties similarly */}
//         </div>
//       ))}
//     </div>
//   );
// };

function CardItem(trials) {
  return (
    <>
      <li className='cards__item'>
        <Link className='cards__item__link' to={trials.path}>
          <figure className='cards__item__pic-wrap' data-category={trials.department}>
            <img
              className='cards__item__img'
              alt='Travel Image'
              src={trials.src}
            />
          </figure>
          <div className='cards__item__info'>
            <h5 className='cards__item__text'>{trials.title}</h5>
          </div>
        </Link>
      </li>
    </>
  );
}

export default CardItem;
