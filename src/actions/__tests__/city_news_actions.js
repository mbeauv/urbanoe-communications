import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { getCityNews } from '../city_news_actions';

const TEST_CITY_ID = 4;
const TEST_PAGE_ID = 2;

const mock = new MockAdapter(axios);
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('city_news_actions', () => {
  describe('getCityNews', () => {
    afterEach(() => {
      mock.reset();
      mock.restore();
    });

    it('handles successful fetch', () => {
      mock.onGet('https://www.urbanoe.com/mobile/activities.json?scope=for_city&city_id=4&page=2').reply(200, []);

      const expectedActions = [
        { type: 'CITY_NEWS_PAGE_REQUEST', cityId: TEST_CITY_ID, pageId: TEST_PAGE_ID },
        { type: 'CITY_NEWS_PAGE_RESPONSE_OK', cityNews: [] },
      ];

      const store = mockStore({ todos: [] });

      return store.dispatch(getCityNews(TEST_CITY_ID, TEST_PAGE_ID)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });
});
