import './widgetLg.scss';
export default function WidgetLg() {
  const Button = ({ type }) => {
    return <button className={'widgetLgButton ' + type}>{type}</button>;
  };
  return (
    <div className='dashBWidgetLg'>
      <h3 className='dashBWidgetLgTitle'>Latest Transactions</h3>
      <table className='dashBWidgetLgTable'>
        <thead className='dashBWidgetLgTableTr'>
          <tr>
            <th className='dashBWidgetLgTableTh'>Customer</th>
            <th className='dashBWidgetLgTableTh'>Date</th>
            <th className='dashBWidgetLgTableTh'>Amount</th>
            <th className='dashBWidgetLgTableTh'>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr className='dashBWidgetLgTr'>
            <td className='dashBWidgetLgUser'>
              <img
                src='https://images.pexels.com/photos/4172933/pexels-photo-4172933.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
                alt=''
                className='dashBWidgetLgImg'
              />
              <span className='dashBWidgetName'>Susan Carol</span>
            </td>
            <td className='dashBWidgeLgtDate'>2 Jun 2021</td>
            <td className='dashBWidgetLgAmount'>$122.00</td>
            <td className='dashBWidgetLgStatus'>
              <Button type='Approved' />
            </td>
          </tr>
          <tr className='dashBWidgetLgTr'>
            <td className='dashBWidgetLgUser'>
              <img
                src='https://images.pexels.com/photos/4172933/pexels-photo-4172933.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
                alt=''
                className='dashBWidgetLgImg'
              />
              <span className='dashBWidgetName'>Susan Carol</span>
            </td>
            <td className='dashBWidgeLgtDate'>2 Jun 2021</td>
            <td className='dashBWidgetLgAmount'>$122.00</td>
            <td className='dashBWidgetLgStatus'>
              <Button type='Declined' />
            </td>
          </tr>
          <tr className='dashBWidgetLgTr'>
            <td className='dashBWidgetLgUser'>
              <img
                src='https://images.pexels.com/photos/4172933/pexels-photo-4172933.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
                alt=''
                className='dashBWidgetLgImg'
              />
              <span className='dashBWidgetName'>Susan Carol</span>
            </td>
            <td className='dashBWidgeLgtDate'>2 Jun 2021</td>
            <td className='dashBWidgetLgAmount'>$122.00</td>
            <td className='dashBWidgetLgStatus'>
              <Button className='widgetLgButton' type='Pending' />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
