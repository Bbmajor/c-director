type EventEmitter = {
  // inherited from EventEmitter
  removeListener: (event: string, listener: unknown) => void;
  on: (event: string, listener: unknown) => void;
};

export type ListOption = {
  text: string;
  value: number | string;
  disabled: boolean;
};

export type EndPoint = EventEmitter & {
  // Methods
  close: () => void;
  open: () => void;
  untilOpen: () => Promise<void>;
};

export type SongEndPoint = EndPoint & {
  // Properties
  currentState: string;
  name: string;
  pr: number;
};

export type Engine = {
  // Methods
  isStarted: () => Promise<boolean>;
  restart: () => Promise<void>;
  start(): () => Promise<void>;
  startStop(): () => Promise<void>;
  stop(): () => Promise<void>;
};

export type TransportEndPoint = EndPoint & {
  // Methods
  cycleLoopMode: () => void;
  pause: () => void;
  play: () => void;
  stop: () => void;
  togglePause: () => void;
  togglePlay: () => void;
  togglePlayPause: () => void;
  togglePlayStop: () => void;
  // Properties
  loopCount: number;
  loopIteration: number;
  loopMode: string;
  state: string;
  tempo: number;
  timeSignature: string;
  timeSignatureDen: number;
  timeSignatureNum: number;
};

export type SongPart = {
  name: string;
  color: number;
  pr: number;
};

export type SongPartsEndPoint = EndPoint & {
  // Methods
  loadFirstState: (delayed?: boolean) => void;
  loadLastState: (delayed?: boolean) => void;
  loadNextState: (direction: number, delayed?: boolean, wrap?: boolean) => void;
  loadStateByProgram: (index: number, delayed?: boolean) => void;
  // Properties
  currentState: SongPart;
  currentStateIndex: number;
  items: SongPart[];
  name: string;
};

export type ShowNote = {
  backgroundColor: number;
  bold: boolean;
  color: number;
  fixedPitch: boolean;
  fontSize: number;
  hidden: boolean;
  imageHeight: number;
  imageScale: number;
  imageUrl: string;
  imageWidth: number;
  kind: string;
  name: string;
  pr: number;
  text: string;
  textAlign: string;
  textColor: number;
};

export type Slide = {
  hidden: boolean;
  backgroundColor: string;
  text: {
    content: string;
    fontsize: number;
    fixedPitch: boolean;
    bold: boolean;
    align: string;
    color: string;
  };
  image: {
    url: string;
    height: number;
    width: number;
    scale: number;
  };
};

export type ShowNotesEndPoint = EndPoint & {
  // Properties
  items: ShowNote[];
};

export type SetListItem = {
  // Properties
  name: string;
  pr: number;
  color: number;
  kind: string;
};
export type SetListEndPoint = EndPoint & {
  // Methods
  available: () => Promise<string[]>;
  loadFirstSong: (delayed?: boolean) => void;
  loadLastSong: (delayed?: boolean) => void;
  loadNextSong: (direction: number, delayed?: boolean, wrap?: boolean) => void;
  loadSetList: (name: string, loadFirst?: boolean) => void;
  loadSongByIndex: (index: number, delayed?: boolean) => void;
  loadSongByProgram: (program: number, delayed?: boolean) => void;
  // Properties
  currentSong: SetListItem;
  currentSongIndex: number;
  items: SetListItem[];
  name: string;
  preLoaded: boolean;
};

type BindingParam = {
  // Properties
  name: string;
  type: string;
};
type BindingPointEntry4 = {
  // Properties
  bindableId: string;
  bindingPointId: string;
  displayName: string;
  isSource: boolean;
  isTarget: boolean;
};
type BindingPointInfo4 = {
  // Properties
  bindableParams: BindingParam[];
  bindingPointParams: BindingParam[];
  displayName: string;
  id: string;
  kind: string;
  valueFormat: string;
  valueMax: number;
  valueMin: number;
};
export type Binding4Watcher = {
  // Methods
  unwatch: () => void;
  // Properties
  bindableId: string;
  bindableParams: object;
  bindingPointId: string;
  bindingPointParams: object;
  value: object;
};

export type Bindings4EndPoint = EndPoint & {
  // Methods
  availableBindingPoints: () => Promise<BindingPointEntry4>;
  bindingPointInfo: () => Promise<BindingPointInfo4>;
  invoke: (
    bindableId: string,
    bindingPointId: string,
    bindableParams: object,
    bindingPointParams: object,
  ) => Promise<void>;
  query: (
    bindableId: string,
    bindingPointId: string,
    bindableParams: object,
    bindingPointParams: object,
  ) => object;
  watch: (
    bindableId: string,
    bindingPointId: string,
    bindableParams?: object,
    bindingPointParams?: object,
    callback?: (value: unknown, source: Binding4Watcher) => void,
  ) => Binding4Watcher;
};

export type ColorEntry = {
  back: string;
  fore: string;
};

export type ApplicationEndPoint = EndPoint & {
  // Properties
  bankedProgramNumberFormat: string;
  baseProgramNumber: number;
  build: number;
  busy: boolean;
  colors: ColorEntry[];
  companyName: string;
  copyright: string;
  edition: string;
  name: string;
  version: string;
};

export type CantabileApi = EventEmitter & {
  // Methods
  connect: () => void;
  disconnect: () => void;
  request: (obj: object) => Promise<object>;
  send: (obj: object) => void;
  untilConnected: () => Promise<string>;
  // Properties
  application: ApplicationEndPoint;
  bindings4: Bindings4EndPoint;
  setList: SetListEndPoint;
  showNotes: ShowNotesEndPoint;
  song: SongEndPoint;
  songStates: SongPartsEndPoint;
  transport: TransportEndPoint;
  engine: Engine;
  // unused
  onscreenKeyboard: EndPoint;
  commands: EndPoint;
  keyRanges: EndPoint;
  variables: EndPoint;
};

export type ListenSpec = {
  event: string;
  action: string;
  listener: unknown;
};

export type WatchSpec = {
  bindingPointId: string;
  action: string;
  watcher: Binding4Watcher;
};

// Preferences Types
type OptionSetting = boolean;

type OptionDisplayText = string;

export type OptionKey = string;

export type Option = {
  value: OptionKey;
  text: OptionDisplayText;
  setting: OptionSetting;
  disabled: boolean;
};
