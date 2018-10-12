import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import {
  getCurrentPot,
  sendNameToServer,
  sendPitchInToServer,
  sendGetOneToServer
} from './socket';
import { getAName } from './usernames';
import SnackBarNotif from './SnackbarNotif';

class App extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    const name = getAName();
    getCurrentPot(dispatch);
    dispatch({ type: 'ASSIGNED_USERNAME', name });
    sendNameToServer(name);
  }

  closeSnackbar = () => this.props.dispatch({ type: 'ANOTHER_ONE_PITCHED_IN' });

  getOne = () => {
    const { dispatch, name } = this.props;
    dispatch({ type: 'GET_ONE' });
    sendGetOneToServer(name);
  };

  pitchIn = () => {
    const { dispatch, name } = this.props;
    dispatch({ type: 'PITCH_IN' });
    sendPitchInToServer(name);
  };

  render() {
    const {
      pot,
      name,
      names,
      snackbarIsOpen,
      mode,
      whoDidIt
    } = this.props;
    return (
      <Grid container justify="center">
        <Grid style={{ textAlign: 'center' }} item xs={12}>
          <h1>{pot}</h1>
        </Grid>
        <Grid style={{ textAlign: 'right', padding: '10px' }} item xs={6}>
          <Button onClick={this.pitchIn} variant="raised" color="primary">
            pitch in!
          </Button>
        </Grid>
        <Grid style={{ textAlign: 'left', padding: '10px' }} item xs={6}>
          <Button onClick={this.getOne} variant="raised" color="secondary">
            get one!
          </Button>
        </Grid>
        <Grid style={{ textAlign: 'center' }} item xs={12}>
          <div
            style={{
              height: '500px',
              textAlign: 'center',
              width: '300px',
              border: '1px solod black',
              display: 'inline-block'
            }}
          >
            Your assigned username is{' '}
            <span style={{ color: 'red' }}>{name}</span>
            <div style={{ padding: '10px' }}>
              Other members:
              {names.length <= 1 ? (
                <div style={{ color: 'red' }}>No other members yet</div>
              ) : (
                names.map(member => (
                  <div
                    style={{ display: name === member && 'none' }}
                    key={member}
                  >
                    {member}
                  </div>
                ))
              )}
            </div>
          </div>
        </Grid>
        <SnackBarNotif
          mode={mode}
          closeSnackbar={this.closeSnackbar}
          name={whoDidIt}
          snackbarIsOpen={snackbarIsOpen}
        />
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  pot: state.pot,
  name: state.name,
  names: state.names,
  snackbarIsOpen: state.snackbarIsOpen,
  mode: state.mode,
  whoDidIt: state.whoDidIt
});

export default connect(mapStateToProps)(App);
