import './featuredInfo.scss';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

export default function FeaturedInfo() {
  return (
    <div className='dashBoardfeatured'>
      <div className='dashBoardfeaturedWrapper'>
        <div className='dashBoardfeaturedItem'>
          <span className='dashBoardfeaturedTitle'>Revenue</span>
          <div className='dashBoardfeaturedMoneyContainer'>
            <span className='dashBoardfeaturedMoney'>$2,415</span>
            <span className='dashBoardfeaturedMoneyRate'>
              -11.4{' '}
              <ArrowDownwardIcon className='dashBoardfeaturedIcon negative' />
            </span>
          </div>
          <span className='dashBoardfeaturedSub'>Compared to last month</span>
        </div>
        <div className='dashBoardfeaturedItem'>
          <span className='dashBoardfeaturedTitle'>Sales</span>
          <div className='dashBoardfeaturedMoneyContainer'>
            <span className='dashBoardfeaturedMoney'>$4,415</span>
            <span className='dashBoardfeaturedMoneyRate'>
              -1.4{' '}
              <ArrowDownwardIcon className='dashBoardfeaturedIcon negative' />
            </span>
          </div>
          <span className='dashBoardfeaturedSub'>Compared to last month</span>
        </div>
        <div className='dashBoardfeaturedItem'>
          <span className='dashBoardfeaturedTitle'>Cost</span>
          <div className='dashBoardfeaturedMoneyContainer'>
            <span className='dashBoardfeaturedMoney'>$2,225</span>
            <span className='dashBoardfeaturedMoneyRate'>
              +2.4 <ArrowUpwardIcon className='dashBoardfeaturedIcon' />
            </span>
          </div>
          <span className='dashBoardfeaturedSub'>Compared to last month</span>
        </div>
      </div>
    </div>
  );
}
