#!/usr/bin/env python
from setuptools import setup, find_packages

VERSION = __import__("tt").__version__

setup(
    name='tt',
    version='2u01-linux-x64-py26',
    description="XXX Network Automation APIs",
    author="XXX Networkautomation Team",
    author_email='XXX.cc.networkautomation@aa.com',
    url='',
    packages=find_packages(exclude=["tests.*", "tests"]),
    classifiers=[
        "Development Status :: 1 - Development",
        "Environment :: Web Environment",
        "Intended Audience :: Developers",
        "Operating System :: OS Independent",
        "Programming Language :: Python",
        "Framework :: Django, DjangoRestFramework",
    ],
    zip_safe=False,
)
