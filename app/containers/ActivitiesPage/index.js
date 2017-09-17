import React from 'react';
import Card from 'material-ui/Card';
import { numberWithCommas } from 'components/theme';
import fetchCollection from '../../network';

export default class ActivitiesPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  state = {
    isLoading: true,
    activities: null,
  }

  componentDidMount() {
    fetchCollection('activities', {
      q: '*:*',
      rows: 20,
      wt: 'json',
    })
      .then((activities) => {
        this.setState({
          isLoading: false,
          activities: activities.response.docs,
        });
      });

    let scrollLeft = 0;
    this.sliderInterval = setInterval(() => {
      if (!this.slider) {
        return;
      }
      this.slider.scrollLeft = scrollLeft;
      if (scrollLeft >= this.slider.scrollWidth) {
        this.slider.scrollLeft = this.slider.scrollWidth;
        clearTimeout(this.sliderInterval);
      }
      scrollLeft += 1;
    }, 30);
  }

  componentWillUnmount() {
    clearTimeout(this.sliderInterval);
  }

  render() {
    const {
      isLoading,
      activities,
    } = this.state;

    if (isLoading) {
      return null;
    }

    return (
      <div>
        <div
          style={{
            height: 120,
          }}
        />
        <div
          id="abc"
          onClick={() => clearTimeout(this.sliderInterval)}
          ref={(el) => { this.slider = el; }}
          style={{
            overflowX: 'scroll',
            whiteSpace: 'nowrap',
            padding: '30px 180px 60px 180px',
          }}
        >
          {activities.map((activity) => (
            <Card
              key={activity.id}
              style={{
                width: 320,
                height: 400,
                padding: 15,
                display: 'inline-block',
                whiteSpace: 'normal',
                margin: '0 30px',
                verticalAlign: 'bottom',
              }}
            >
              <h2>{activity.campaign_initiative}</h2>
              <p>{activity.comments}</p>
              <strong>Promocode</strong> {activity.promocodes}
              <p>Reached {numberWithCommas(activity.targeted_counts)} by {activity.activity_type}</p>
            </Card>
          ))}
        </div>
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            width: 240,
            height: 780,
            pointerEvents: 'none',
            background: 'linear-gradient(to right, rgba(255,255,255,1) 0%,rgba(255,255,255,1) 25%,rgba(255,255,255,0) 100%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            right: 0,
            top: 0,
            width: 240,
            height: 780,
            pointerEvents: 'none',
            background: 'linear-gradient(to left, rgba(255,255,255,1) 0%,rgba(255,255,255,1) 25%,rgba(255,255,255,0) 100%)',
          }}
        />
      </div>
    );
  }
}
