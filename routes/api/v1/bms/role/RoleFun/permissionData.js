const PermissionData = [
  {
    label: "User",
    key: "user",
    enable: true,
    actions: [
      {
        label: "List",
        key: "list",
        enable: true
      },
      {
        label: "Add",
        key: "add",
        enable: true
      },
      {
        label: "Edit",
        key: "edit",
        enable: false,
        fieldPermissions: []
      },
      {
        label: "Delete",
        key: "delete",
        enable: true
      },
      {
        label: "Owner View",
        key: "ownerView",
        enable: true
      },
      {
        label: "Owner Edit",
        key: "ownerEdit",
        enable: true,
        fieldPermissions: [] 
      },
      {
        label: "Owner Delete",
        key: "ownerDelete",
        enable: true
      }
    ]
  },
  {
    label: "Booking",
    key: "booking",
    enable: true,
    actions: [
      {
        label: "List",
        key: "list",
        enable: true
      },
      {
        label: "Add",
        key: "add",
        enable: true
      },
      {
        label: "Edit",
        key: "edit",
        enable: false,
        fieldPermissions: []
      },
      {
        label: "Delete",
        key: "delete",
        enable: true
      },
      {
        label: "Owner View",
        key: "ownerView",
        enable: true
      },
      {
        label: "Owner Edit",
        key: "ownerEdit",
        enable: true,
        fieldPermissions: [] 
      },
      {
        label: "Owner Delete",
        key: "ownerDelete",
        enable: true
      }
    ]
  }
];

module.exports = PermissionData;
