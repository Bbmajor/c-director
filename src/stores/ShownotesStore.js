/* -- src\stores\ShownotesStore.js -- */
import { defineStore } from 'pinia';

export const useShownotesStore = defineStore('shownotes', {
  state: () => ({
    endPoint: null,
    items: [],
  }),

  getters: {
    showNoteItems: (state) => {
      var items = [];
      if (state.items) {
        items = state.items;
      }
      return items
        .map(splitItem)
        .flat()
        .filter(function (item) {
          return !item.hidden;
        });
    },
  },

  actions: {
    open(endPoint) {
      this.endPoint = endPoint;
      this.endPoint.on(
        'changed',
        (this.listener1 = function () {
          this.setItems();
        }.bind(this)),
      );
      this.endPoint.open();
      this.setItems();
    },

    close() {
      this.endPoint.removeListener('changed', this.listener1);
      this.endPoint.close();
      this.endPoint = null;
    },

    setItems() {
      if (this.endPoint.items) {
        this.items = this.endPoint.items.map(formatItem);
      } else {
        this.items = null;
      }
    },
  },
});

const formatItem = function (item) {
  return {
    hidden: item.hidden,
    backgroundColor: item.backgroundColor,
    text: {
      content: item.text,
      fontsize: item.fontSize,
      fixedPitch: item.fixedPitch,
      bold: item.bold,
      align: item.textAlign,
      color: item.textColor,
    },
    image: {
      url: item.imageUrl,
      height: item.imageHeight,
      width: item.imageWidth,
      scale: item.imageScale,
    },
  };
};

const splitItem = function (item) {
  return [textItem(item), imageItem(item)];
};

const textItem = function (item) {
  return {
    isText: true,
    hidden: item.hidden || !item.text.content,
    backgroundColor: item.backgroundColor,
    text: item.text,
    image: {},
  };
};

const imageItem = function (item) {
  return {
    isText: false,
    hidden: item.hidden || !item.image.url,
    backgroundColor: item.backgroundColor,
    text: {},
    image: item.image,
  };
};
