export interface ITypeEState {
    x: number;
    y: number;
    direction: DIRECTIONS;
}

export enum DIRECTIONS {
    NORTH = 1,
    EAST,
    SOUTH,
    WEST
}
