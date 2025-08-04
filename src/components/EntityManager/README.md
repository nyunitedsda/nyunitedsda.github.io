# EntityManager Component

The `EntityManager` is a generic, reusable component that provides a complete CRUD interface for managing database entities. It was created from the `NotificationManagement` component and accepts the item display component and editor component as props.

## Features

- Generic type support for any entity with an `id` field
- Configurable item display component
- Configurable editor/form component
- Built-in loading states
- Delete confirmation dialogs
- Success/error notifications
- Automatic query invalidation after operations

## Props

### EntityManagerProps<T>

| Prop | Type | Description |
|------|------|-------------|
| `entityName` | `DatabaseEntity` | The database entity name (must be one of the valid database entities) |
| `queryKey` | `string` | React Query key for caching |
| `title` | `string` | Page title |
| `subtitle` | `string` | Page subtitle |
| `emptyText` | `string` | Text to display when no items exist |
| `deleteConfirmation` | `{title: string, message: string}` | Delete confirmation dialog content |
| `ItemComponent` | `ComponentType<ItemComponentProps>` | Component to render each item |
| `EditorComponent` | `ComponentType<EditorComponentProps<T>>` | Component for editing/creating items |
| `getItemTitle` | `(item: T) => string` | Function to extract title from item |
| `getItemSubtitle` | `(item: T) => string` | Function to extract subtitle from item |
| `createNewEntity` | `() => Partial<T>` | Function to create default values for new items |
| `successMessages?` | `{save?: string, delete?: string}` | Optional custom success messages |

## Component Interfaces

### ItemComponentProps
```typescript
interface ItemComponentProps {
  title: string;
  subtitle: string;
  onEdit?: () => void;
  onDelete?: () => void;
  sx?: SxProps<Theme>;
}
```

### EditorComponentProps<T>
```typescript
interface EditorComponentProps<T> {
  open: boolean;
  entity?: Partial<T>;
  onClose: () => void;
  onSuccess?: (data?: T) => void;
}
```

## Usage Example

```typescript
import { FC } from "react";
import EntityManager from "../../../components/EntityManager";
import NotificationEditor from "../../../forms/collection/NotificationEditor/NotificationEditor";
import DonationItem from "../../Donations/components/DonationItem";
import type { NotificationDT } from "../../../api/request/types";

const NotificationAdmin: FC = () => {
  // Wrapper component to handle type compatibility
  const WrappedNotificationEditor = ({
    open,
    entity,
    onClose,
    onSuccess,
  }: {
    open: boolean;
    entity?: Partial<NotificationDT>;
    onClose: () => void;
    onSuccess?: (data?: NotificationDT) => void;
  }) => (
    <NotificationEditor
      open={open}
      entity={entity}
      onClose={onClose}
      onSuccess={onSuccess ? () => onSuccess() : undefined}
    />
  );

  return (
    <EntityManager<NotificationDT>
      entityName="notifications"
      queryKey="admin-notifications"
      title=""
      subtitle="Manage application notifications"
      emptyText="No notifications available."
      deleteConfirmation={{
        title: "Delete Notification",
        message: "Are you sure you want to delete this notification? This action cannot be undone.",
      }}
      ItemComponent={DonationItem}
      EditorComponent={WrappedNotificationEditor}
      getItemTitle={(notification) => notification?.title as string}
      getItemSubtitle={(notification) => notification.message as string}
      createNewEntity={() => ({ title: "", message: "" })}
      successMessages={{
        save: "Notification saved successfully",
        delete: "Notification deleted successfully",
      }}
    />
  );
};
```

## Creating Custom Item Components

Your item component must implement the `ItemComponentProps` interface:

```typescript
const CustomItemComponent: FC<ItemComponentProps> = ({
  title,
  subtitle,
  onEdit,
  onDelete,
  sx
}) => {
  return (
    <div style={{ ...sx }}>
      <h3>{title}</h3>
      <p>{subtitle}</p>
      <button onClick={onEdit}>Edit</button>
      <button onClick={onDelete}>Delete</button>
    </div>
  );
};
```

## Creating Custom Editor Components

Your editor component must implement the `EditorComponentProps<T>` interface:

```typescript
const CustomEditor: FC<EditorComponentProps<YourEntityType>> = ({
  open,
  entity,
  onClose,
  onSuccess
}) => {
  // Your form implementation
  return (
    <Modal open={open} onClose={onClose}>
      {/* Your form content */}
      <button onClick={() => onSuccess?.()}>Save</button>
    </Modal>
  );
};
```

## Benefits

1. **Reusability**: One component handles all entity management patterns
2. **Type Safety**: Full TypeScript support with generics
3. **Consistency**: Uniform behavior across all entity managers
4. **Maintainability**: Single source of truth for CRUD operations
5. **Customization**: Flexible component composition through props
