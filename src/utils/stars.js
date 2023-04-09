import star from '../static/star-rating-icon-3.jpg';
import emptyStar from '../static/star-512.jpg';

const oneStar = <img src={star} alt="Full star" style={{ height: '18px', width: '18px' }}></img>
const oneEmptyStar = <img src={emptyStar} alt="Empty star" style={{ height: '18px', width: '18px' }}></img>
export const stars = {
    1: <>{oneStar}{oneEmptyStar}{oneEmptyStar}{oneEmptyStar}{oneEmptyStar}</>,
    2: <>{oneStar}{oneStar}{oneEmptyStar}{oneEmptyStar}{oneEmptyStar}</>,
    3: <>{oneStar}{oneStar}{oneStar}{oneEmptyStar}{oneEmptyStar}</>,
    4: <>{oneStar}{oneStar}{oneStar}{oneStar}{oneEmptyStar}</>,
    5: <>{oneStar}{oneStar}{oneStar}{oneStar}{oneStar}</>,
}