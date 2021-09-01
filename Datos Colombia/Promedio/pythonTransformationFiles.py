# -*- coding: utf-8 -*-
"""
Created on Tue Aug 31 15:36:43 2021

@author: Admin
"""

import pandas as pd
import json

data = open("wind_RCP85_mean.csv", "r")

linea = data.readline()
#print(linea)
linea = data.readline().replace("\n", "")
archivo = open("sample.json", "w")
archivo.write("[")
auxi = 1
a = []
while linea != "":
    print(auxi)
    #archivo = open("xsample"+str(auxi)+".json", "w")
    valores = linea.split(",")
    dicci = {"latitud":float(valores[0]),"longitud": float(valores[1]), "radiacion":[]}
    #valores = valores.append("1")
    for i in range(2,362):
        dicci["radiacion"].append(float(valores[i]))
    linea=data.readline().replace("\n", "")
    a.append(dicci)
    json_dump = json.dumps(dicci)
    #print(dicci)
    archivo.write(json_dump+",\n")

    auxi+=1
    
archivo.write("]")
archivo.close()  
data.close()

#json_object = json.dumps(a[0], indent = 4)
  
# Writing to sample.json
#with open("sample.json", "w") as outfile:
#    outfile.write(json_object)


   

