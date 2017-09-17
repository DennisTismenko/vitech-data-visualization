import React from 'react';
import Card from 'material-ui/Card';
import { numberWithCommas } from 'components/theme';
import { Link } from 'react-router';
import { findIndex } from 'lodash';
import fetchCollection from '../../network';

export default class ActivitiesPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  state = {
    isLoading: true,
    activities: null,
    scaledElementIndex: null,
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

    this.startSlider();
  }

  componentWillUnmount() {
    this.stopSlider();
  }

  startSlider = () => {
    let scrollLeft = this.slider ? this.slider.scrollLeft : 0;
    let lastTick = Date.now();
    this.sliderInterval = setInterval(() => {
      if (!this.slider) {
        return;
      }
      this.slider.scrollLeft = scrollLeft;
      if (scrollLeft >= this.slider.scrollWidth) {
        this.slider.scrollLeft = this.slider.scrollWidth;
        this.stopSlider();
      }

      const scaledElementIndex = findIndex(Array.from(this.slider.children), (el) => {
        const rect = el.getBoundingClientRect();
        const isScaled = (rect.left + (rect.width / 2)) / window.innerWidth >= 0.3
          && (rect.left + (rect.width / 2)) / window.innerWidth <= 0.6;
        return isScaled;
      });

      this.setState({
        scaledElementIndex,
      });

      const now = Date.now();
      const deltaSeconds = (now - lastTick) / 1000;
      lastTick = now;
      scrollLeft += 35 * deltaSeconds;
    }, 16);
  }

  stopSlider = () => {
    clearInterval(this.sliderInterval);
    this.setState({
      scaledElementIndex: null,
    });
  }

  render() {
    const {
      isLoading,
      activities,
      scaledElementIndex,
    } = this.state;

    if (isLoading) {
      return null;
    }

    return (
      <div>
        <div style={{ height: 140 }} />
        <div
          id="abc"
          onClick={() => {
            this.stopSlider();
            clearTimeout(this.sliderTimeout);
            this.sliderTimeout = setTimeout(this.startSlider, 3000);
          }}
          ref={(el) => { this.slider = el; }}
          style={{
            overflowX: 'scroll',
            whiteSpace: 'nowrap',
            padding: '30px 300px 60px 300px',
          }}
        >
          {activities.map((activity, i) => (
            <Link
              key={activity.id}
              to={`/activities/${activity.id}`}
              style={{ color: '#222', textDecoration: 'none' }}
            >
              <Card
                style={{
                  width: 320,
                  height: 440,
                  padding: 15,
                  display: 'inline-block',
                  whiteSpace: 'normal',
                  margin: '0 30px',
                  verticalAlign: 'bottom',
                  transition: 'transform 2s',
                  transform: i === scaledElementIndex ? 'scale(1.1)' : '',
                }}
              >
                <h2>{activity.campaign_initiative}</h2>
                <p>{activity.comments}</p>
                <p><strong>Campaign started</strong> {activity.activity_date.split('T')[0]}</p>
                <p><strong>Activity type</strong> {activity.activity_type}</p>
                <p><strong>Reach</strong> {numberWithCommas(activity.targeted_counts)} people</p>
                <p><strong>Promocode</strong> {activity.promocodes}</p>
              </Card>
            </Link>
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
