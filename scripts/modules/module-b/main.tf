terraform {
  required_version = ">= 1.8"
}

module "mod_c" {
  source            = "../../modules/module-c"
}
