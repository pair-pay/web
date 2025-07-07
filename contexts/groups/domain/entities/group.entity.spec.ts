import { Group } from './group.entity';
import { GroupNameValueObject } from '../value-objects/group-name.value-object';
import { GroupDescriptionValueObject } from '../value-objects/group-description.value-object';

describe('Group', () => {
  it('should create a group', () => {
    const group = new Group(
      'test-id',
      new GroupNameValueObject('test-name'),
      new GroupDescriptionValueObject('test-description'),
      new Date(),
      new Date(),
    );
    expect(group).toBeDefined();
    expect(group.id).toBe('test-id');
    expect(group.name).toBe('test-name');
  });
});
