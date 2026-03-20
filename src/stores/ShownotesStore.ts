import { defineStore } from 'pinia';
import { type ShowNotesEndPoint, type Slide, type ListenSpec } from '@/types';

export const useShownotesStore = defineStore('shownotes', {
  state: () => ({
    endPoint: {} as ShowNotesEndPoint,
    items: [] as Slide[],

    listeners: [
      {
        event: 'changed',
        action: 'setItems',
        listener: null,
      },
    ] as ListenSpec[],
  }),

  getters: {
    showNoteItems: (state) => {
      const items = state.items;
      return items
        .map(splitItem)
        .flat()
        .filter(function (item) {
          return !item.hidden;
        });
    },
  },

  actions: {
    open(endPoint: ShowNotesEndPoint) {
      this.endPoint = endPoint;
      for (const listen of this.listeners) {
        this.endPoint.on(
          listen.event,
          (listen.listener = this[listen.action].bind(this)),
        );
      }
      this.setItems();
    },

    close() {
      if (this.endPoint) {
        for (const listen of this.listeners) {
          this.endPoint.removeListener(listen.event, listen.listener);
        }
        this.endPoint.close();
      }
      this.endPoint = {} as ShowNotesEndPoint;
    },

    setItems() {
      if (this.endPoint.items) {
        this.items = this.endPoint.items.map(formatItem);
      } else {
        this.items = [] as Slide[];
      }
    },
  },
});

const backgroundColors = [
  '#000000',
  '#6B0B0B',
  '#3B0B0B',
  '#0B3B0B',
  '#0B6B0B',
  '#0B0B6B',
  '#0B0B3B',
  '#6B6B0B',
  '#3B3B0B',
  '#6B0B6B',
  '#3B0B3B',
  '#0B6B6B',
  '#0B3B3B',
  '#6B3B0B',
  '#3B230B',
];
const foregroundColors = [
  '#FFFFFF',
  '#FF0000',
  '#800000',
  '#008000',
  '#00FF00',
  '#0000FF',
  '#000080',
  '#FFFF00',
  '#808000',
  '#FF00FF',
  '#800080',
  '#00FFFF',
  '#008080',
  '#FF8000',
  '#804000',
];

const formatItem = function (item) {
  return {
    hidden: item.hidden,
    backgroundColor: backgroundColors[item.backgroundColor],
    text: {
      content: item.text,
      fontsize: item.fontSize,
      fixedPitch: item.fixedPitch,
      bold: item.bold,
      align: item.textAlign,
      color: foregroundColors[item.textColor],
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
