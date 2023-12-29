import { ISeriesApi } from 'lightweight-charts';

interface Point {
  type: number;
  time: number;
  value: number;
}

interface Line {
  series?: ISeriesApi<'Line'>;
  disabled?: boolean;
  obscure?: boolean;
}

export
class LineStore {
  public legendMouseEnter(type: string) {

  }

  public legendMouseLeave(type: string) {

  }

  public legendClick(type: string) {

  }

  public lineMouseEnter(type: string) {

  }

  public lineMouseLeave(type: string) {

  }

  public filter(userInput: string) {

  }

  public filterApply(userInput: string) {

  }

  public reset() {

  }
}
