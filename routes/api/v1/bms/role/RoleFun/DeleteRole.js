const DeleteRole = async (req, res) => {
    try {
      const roleId = req.params.id;
  
      // Check if the role exists
      const role = await Role.findById(roleId);
      if (!role) {
        return res.status(404).json({
          message: "Role not found.",
          variant: "error",
        });
      }
  
      // Check if this role is assigned to any user
      const user = await User.findOne({ role: roleId });
      if (user) {
        return res.status(400).json({
          message: "This role is assigned to a user. Please reassign the role to the user before deleting.",
          variant: "error",
        });
      }
  
      // Delete the role
      await Role.findByIdAndDelete(roleId);
  
      return res.status(200).json({
        message: "Role deleted successfully.",
        variant: "success",
      });
    } catch (error) {
      console.error("Error deleting role:", error);
      return res.status(500).json({
        message: "Internal server error.",
        variant: "error",
      });
    }
  };
  
  module.exports = DeleteRole;
  