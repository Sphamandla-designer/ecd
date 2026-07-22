# kotlinx.serialization
-keepattributes *Annotation*, InnerClasses
-keep,includedescriptorclasses class org.ecdconnect.elp.**$$serializer { *; }
-keepclassmembers class org.ecdconnect.elp.** { *** Companion; }
-keepclasseswithmembers class org.ecdconnect.elp.** { kotlinx.serialization.KSerializer serializer(...); }
