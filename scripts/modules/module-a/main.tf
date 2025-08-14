terraform {
  required_version = ">= 1.8"
}

module "mod_b" {
  source = "../module-b"
}
