import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import moment from 'moment';
import style from 'components/Card/style.scss'

class Card extends Component {

  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  render() {
    const { from, to, arrivalTime, departureTime, carrier } = this.props;

    return (
      <li className={style.card}>
        Carrier: <strong>{carrier}</strong>
        <br/><br/>
        From: {from}<br/>
        To: {to}<br/><br/>
        Departure time: {moment(departureTime).format('DD MMMM YYYY HH:mm:ss')}<br/>
        Arrival time: {moment(arrivalTime).format('DD MMMM YYYY HH:mm:ss')}
      </li>
    )
  }

}

Card.propTypes = {
  from: React.PropTypes.string.isRequired,
  to: React.PropTypes.string.isRequired,
  arrivalTime: React.PropTypes.string.isRequired,
  departureTime: React.PropTypes.string.isRequired,
  carrier: React.PropTypes.string.isRequired,
}

export default Card;
