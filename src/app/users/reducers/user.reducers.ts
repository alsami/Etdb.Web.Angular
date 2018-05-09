import { User } from '@etdb/users/models';
import { EntityState, createEntityAdapter } from '@ngrx/entity';

export interface UserState extends EntityState<User> {
    selectUserId: string | null;
}

export const adapter = createEntityAdapter<User>({
    selectId: (user: User) => user.id,
    sortComparer: (a: User, b: User) => a.userName.localeCompare(b.userName)
});

export const initialState = adapter.getInitialState({
    selectUser: null
});

export function reducer(state: EntityState<User> = initialState, action: any) {

}


export const selectedId = (state: UserState) => state.selectUserId;
