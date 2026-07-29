# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure("2") do |config|
  # Ubuntu 22.04 LTS
  config.vm.box = "ubuntu/jammy64"

  # VM hostname
  config.vm.hostname = "ubuntu-vm"

  # Private IP (optional)
  config.vm.network "private_network", ip: "192.168.56.10"

  # VirtualBox configuration
  config.vm.provider "virtualbox" do |vb|
    vb.name = "ubuntu-vm"
    vb.memory = 4096   # 4 GB RAM
    vb.cpus = 2        # 2 vCPUs

    # Optional performance tweaks
    # vb.customize ["modifyvm", :id, "--ioapic", "on"]
    # vb.customize ["modifyvm", :id, "--clipboard", "bidirectional"]
    # vb.customize ["modifyvm", :id, "--draganddrop", "bidirectional"]
  end

  # Optional: Update packages on first boot
  # config.vm.provision "shell", inline: <<-SHELL
  #   apt-get update -y
  #   # apt-get upgrade -y
  # SHELL
end