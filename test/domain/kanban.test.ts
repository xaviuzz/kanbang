import { describe, it, vi } from "vitest"
import { defaultKanbang } from "./fixture";
import Kanban from '../../src/domain/kanban'

describe('the kanban', () => {
  it('persists', () => {
    vi.spyOn(localStorage,'setItem')
    new Kanban()    
    expect(localStorage.setItem)
      .toHaveBeenCalledWith('mykanban',JSON.stringify(defaultKanbang))
  });
});