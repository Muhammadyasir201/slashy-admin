import FakeRest from 'fakerest';
import fetchMock from 'fetch-mock';
import generateData from 'data-generator-retail';

export default () => {
    const data = generateData({ serializeDate: true });
    const restServer = new FakeRest.FetchServer(
        'https://slashy-development.herokuapp.com/admin'
    );
    if (window) {
        window.restServer = restServer; // give way to update data in the console
    }
    restServer.init(data);
    restServer.toggleLogging(); // logging is off by default, enable it
    fetchMock.mock(
        'begin:https://slashy-development.herokuapp.com/admin',
        restServer.getHandler()
    );
    return () => fetchMock.restore();
};
